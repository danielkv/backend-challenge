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
    ) {
        this.setup();
    }

    setup() {
        this.eventEmitter.addListener('orderCreated', this.orderCreated);

        this.queueService.bindQueueToExchange('stock', 'stock', 'direct');
    }
    /**
     * Publish a message in Queue service
     * - Runs when order is created
     */
    orderCreated({ order }: CreateOrderEvent) {
        order.products.map((product) => {
            const message = JSON.stringify(product);
            this.queueService.publishInExchange('stock', 'decremented', message, {});
        });
    }
}
