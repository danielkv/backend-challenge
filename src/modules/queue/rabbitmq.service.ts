import amqplib, { Channel, Connection, Message, Options } from 'amqplib';
import { injectable } from 'inversify';
import { BindOpts } from './bind-options.type';
import { IQueueService } from './queue-service.interface';

@injectable()
export class RabbitMQService implements IQueueService {
    private connection: Connection;
    private channel: Channel;

    private limitErrors: number = 2;
    private retryInterval: number = 3000; //milliseconds
    private countErrors: number = 0;

    /**
     * Start a new connection and channel
     */
    start() {
        return new Promise(async (resolve, reject) => {
            this.connect(resolve, reject);
        });
    }

    async connect(resolve: (value: unknown) => void, reject: (value: unknown) => void) {
        try {
            this.countErrors++;

            if (!this.connection)
                this.connection = await amqplib.connect({
                    hostname: process.env.RABBITMQ_HOST,
                    port: Number(process.env.RABBITMQ_PORT),
                    username: process.env.RABBITMQ_USERNAME,
                    password: process.env.RABBITMQ_PASSWOR,
                });

            if (!this.channel) this.channel = await this.connection.createChannel();

            resolve(true);
        } catch (err) {
            if (this.countErrors > this.limitErrors) reject(err);

            console.log(`Error connecting to RabbitMQ. Trying again in ${this.retryInterval / 1000}s`);
            setTimeout(() => this.connect(resolve, reject), this.retryInterval);
        }
    }

    /**
     * Create and bind queue to exchange
     *
     * @param queue queue name
     * @param exchange exchange name
     * @param opts queue / exchange options
     */
    async bindQueueToExchange(queue: string, exchange: string, type: string, rountingKey: string, opts?: BindOpts) {
        await this.channel.assertExchange(exchange, type, opts?.exchange);

        await this.channel.assertQueue(queue, opts?.queue);

        await this.channel.bindQueue(queue, exchange, rountingKey);
    }

    /**
     * Publish in Exchange
     * - A queue **must be binded** to consume messages
     *
     * @param exchange Exchange name
     * @param routingKey Exchange rounting key
     * @param message Message to be sent
     * @param opts Publish options
     */
    publishInExchange(exchange: string, routingKey: string, message: string, opts?: Options.Publish): boolean {
        if (!this.channel) throw new Error('Channel not created');

        return this.channel.publish(exchange, routingKey, Buffer.from(message), opts);
    }

    /**
     * Setup a consumer for the messages coming from a given queue name
     * @param queueName Queue name
     * @param fn Consumer function that will run when receive a message
     */
    async consume(queueName: string, fn: (message: Message) => any) {
        if (!this.channel) throw new Error('Channel not created');

        const queueExists = await this.channel.checkQueue(queueName);
        if (!queueExists) throw new Error("Queue doesn't exists");

        return await this.channel.consume(queueName, fn);
    }

    /**
     * Mark message as read, and delete it from queue
     */
    markAsRead(message: Message) {
        return this.channel.ack(message);
    }
}
