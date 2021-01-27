import amqplib, { Channel, Connection, Message, Options } from 'amqplib';
import { injectable } from 'inversify';
import { BindOpts } from './bind-options.type';
import { IQueueService } from './queue-service.interface';

@injectable()
export class RabbitMQService implements IQueueService {
    private connection: Connection;
    private channel: Channel;

    /**
     * Start a new connection and channel
     */
    async start() {
        if (!this.connection) this.connection = await amqplib.connect(process.env.RABBITMQ_URL);
        if (!this.channel) this.channel = await this.connection.createChannel();

        return true;
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
