import amqplib, { Channel, Connection, Message, Options } from 'amqplib';
import { injectable } from 'inversify';
import { BindOpts } from './bind-options.type';
import { IQueueService } from './queue-service.interface';

@injectable()
export class RabbitMQService implements IQueueService {
    private connection: Connection;
    private channel: Channel;

    constructor() {
        this.start();
    }

    /**
     * Start a new connection and channel
     */
    async start() {
        this.connection = await amqplib.connect(process.env.RABBITMQ_URL);
        this.channel = await this.connection.createChannel();
    }

    /**
     * Create and bind queue to exchange
     *
     * @param queue queue name
     * @param exchange exchange name
     * @param opts queue / exchange options
     */
    async bindQueueToExchange(queue: string, exchange: string, type: string, opts?: BindOpts) {
        await this.channel.assertExchange(exchange, type, opts.exchange);

        await this.channel.assertQueue(queue, opts.queue);

        await this.channel.bindExchange(queue, exchange, '');
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

        await this.channel.consume(queueName, fn);
    }
}
