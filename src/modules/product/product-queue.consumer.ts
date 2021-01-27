import { Message } from 'amqplib';
import { inject, injectable } from 'inversify';
import { OrderProductDTO } from '../order/dto/order-product.dto';
import { IQueueService } from '../queue/queue-service.interface';
import { UpdateProductStockService } from './services/update-product-stock.service';

@injectable()
export class ProductQueueConsumer {
    constructor(
        private updateProductStockService: UpdateProductStockService,
        @inject('QueueService') private queueService: IQueueService,
    ) {}

    async setup() {
        await this.queueService.start();
        await this.queueService.consume('stockQueue', (msg) => this.changeStock(msg));
    }

    async changeStock(message: Message) {
        try {
            const key = message.fields.routingKey; //increment | decremented
            const content = message.content.toString();

            const product: OrderProductDTO = JSON.parse(content);
            const quantity = key === 'increment' ? product.quantity : -product.quantity;

            // decrement stock
            await this.updateProductStockService.execute(product.referenceProductId, quantity);

            // delete message from queue
            this.queueService.markAsRead(message);
        } catch (err) {
            // in this case, the message should be sent to some log queue or handle the error properly
            console.error(err);
        }
    }
}
