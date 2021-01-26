import { Message, Options } from 'amqplib';
import { BindOpts } from './bind-options.type';

export interface IQueueService {
    /**
     * Start a new connection and channel
     */
    start(): Promise<any>;

    /**
     * Create and bind queue to exchange
     *
     * @param queue queue name
     * @param exchange exchange name
     * @param opts queue / exchange options
     */
    bindQueueToExchange(queue: string, exchange: string, type: string, opts?: BindOpts): Promise<any>;

    /**
     * Publish in Exchange
     * - A queue **must be binded** to consume messages
     *
     * @param exchange Exchange name
     * @param routingKey Exchange rounting key
     * @param message Message to be sent
     * @param opts Publish options
     */
    publishInExchange(exchange: string, routingKey: string, message: string, opts?: Options.Publish): boolean;

    /**
     * Setup a consumer for the messages coming from a given queue name
     * @param queueName Queue name
     * @param fn Consumer function that will run when receive a message
     */
    consume(queueName: string, fn: (message: Message) => any): Promise<any>;
}
