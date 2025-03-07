import { inject, injectable } from 'inversify';
import { IEventEmitter } from '../event-emitter/emitter.interface';
import { IQueueService } from '../queue/queue-service.interface';
import { OrderEntity } from './order.entity';

type CreateOrderEvent = {
    order: OrderEntity;
};

@injectable()
export class OrderEventListener {
    constructor(
        @inject('EventEmitter') private eventEmitter: IEventEmitter,
        @inject('QueueService') private queueService: IQueueService,
    ) {}

    async setup() {
        this.eventEmitter.addListener('createOrder', (args) => this.createOrder(args));

        await this.queueService.start();
        await this.queueService.bindQueueToExchange('stockQueue', 'stock', 'direct', 'incremented');
        await this.queueService.bindQueueToExchange('stockQueue', 'stock', 'direct', 'decremented');
    }
    /**
     * Publish a message in Queue service
     * - Runs when order is created
     */
    createOrder({ order }: CreateOrderEvent) {
        order.products.map((product) => {
            const message = JSON.stringify(product);
            this.queueService.publishInExchange('stock', 'decremented', message, {});
        });
    }
}
