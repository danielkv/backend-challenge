import { Express } from 'express';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { OrderModule } from '../modules/order/order.module';
import { ProductModule } from '../modules/product/product.module';

export function setupModules(app: Express) {
    // start modules
    const productModule = new ProductModule().start();
    const orderModule = new OrderModule().start();

    // create container
    const container = new Container();
    container.load(productModule, orderModule);

    // config routes
    const server = new InversifyExpressServer(container, null, null, app);
    server.build();
}
