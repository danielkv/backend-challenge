import { Express } from 'express';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { EventEmitterModule } from '../modules/event-emitter/event-emitter.module';
import { OrderEventListener } from '../modules/order/order-event.listener';
import { OrderModule } from '../modules/order/order.module';
import { ProductQueueConsumer } from '../modules/product/product-queue.consumer';
import { ProductModule } from '../modules/product/product.module';
import { IQueueService } from '../modules/queue/queue-service.interface';
import { QueueModule } from '../modules/queue/queue.module';

export async function setupModules(app: Express) {
    // start modules
    const eventEmitterModule = new EventEmitterModule().start();
    const productModule = new ProductModule().start();
    const orderModule = new OrderModule().start();
    const queueModule = new QueueModule().start();

    // create container
    const container = new Container();
    container.load(productModule, orderModule, queueModule, eventEmitterModule);

    // start some services
    const productQueueConsumer = container.get(ProductQueueConsumer);
    const orderEventListener = container.get(OrderEventListener);

    await orderEventListener.setup();
    await productQueueConsumer.setup();

    // config routes
    const server = new InversifyExpressServer(container, null, null, app);
    server.build();
}
