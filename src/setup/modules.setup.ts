import { Express } from 'express';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { EventEmitterModule } from '../modules/event-emitter/event-emitter.module';
import { OrderModule } from '../modules/order/order.module';
import { ProductModule } from '../modules/product/product.module';
import { QueueModule } from '../modules/queue/queue.module';

export function setupModules(app: Express) {
    // start modules
    const eventEmitterModule = new EventEmitterModule().start();
    const productModule = new ProductModule().start();
    const orderModule = new OrderModule().start();
    const queueModule = new QueueModule().start();

    // create container
    const container = new Container();
    container.load(productModule, orderModule, queueModule, eventEmitterModule);

    // config routes
    const server = new InversifyExpressServer(container, null, null, app);
    server.build();
}
