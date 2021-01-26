import { Message } from 'amqplib';
import { inject } from 'inversify';
import { JsonContent } from 'inversify-express-utils';
import { OrderEntity } from '../order/order.entity';
import { IQueueService } from '../queue/queue-service.interface';
import { ProductEntity } from './product.entity';
import { UpdateProductStockService } from './services/update-product-stock.service';

export class ProductQueueConsumer {
    constructor(
        private updateProductStockService: UpdateProductStockService,
        @inject('QueueService') private queueService: IQueueService,
    ) {}

    start() {
        this.queueService.consume('stock', this.changeStock);
    }

    changeStock(message: Message) {
        const key = message.fields.routingKey; //increment | decremented
        const content = message.content.toString();

        const product: ProductEntity = JSON.parse(content);
        const quantity = key === 'increment' ? product.quantity : -product.quantity;

        this.updateProductStockService.execute(product.id, quantity);
    }
}
