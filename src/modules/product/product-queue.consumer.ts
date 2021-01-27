import { Message } from 'amqplib';
import { inject, injectable } from 'inversify';
import { JsonContent } from 'inversify-express-utils';
import { OrderEntity } from '../order/order.entity';
import { IQueueService } from '../queue/queue-service.interface';
import { ProductEntity } from './product.entity';
import { UpdateProductStockService } from './services/update-product-stock.service';

@injectable()
export class ProductQueueConsumer {
    constructor(
        private updateProductStockService: UpdateProductStockService,
        @inject('QueueService') private queueService: IQueueService,
    ) {}

    async setup() {
        await this.queueService.start();
        await this.queueService.consume('stock', this.changeStock);
    }

    changeStock(message: Message) {
        const key = message.fields.routingKey; //increment | decremented
        const content = message.content.toString();

        const product: ProductEntity = JSON.parse(content);
        const quantity = key === 'increment' ? product.quantity : -product.quantity;

        this.updateProductStockService.execute(product.id, quantity);
    }
}
