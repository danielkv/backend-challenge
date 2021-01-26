import { Container, interfaces } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Express } from 'express';
import { connectionUtils } from '../database/create-connection.service';
import { EventEmitterModule } from '../event-emitter/event-emitter.module';
import { ProductRepository } from './repository/product.repository';
import { CreateProductService } from './services/create-product.service';
import { FindProductByNameService } from './services/find-product-by-name.service';
import { FindProductsService } from './services/find-products.service';

import './product.controller';

export class ProductModule {
    public container: interfaces.Container;

    start(routes: Express) {
        this.container = this.bindServices();

        this.setupControllers(this.container, routes);

        return this.container;
    }

    private bindServices() {
        // create container
        const container = new Container();

        // repository
        container
            .bind('ProductRepository')
            .toConstantValue(connectionUtils.connection.getCustomRepository(ProductRepository));

        // services
        container.bind(CreateProductService).to(CreateProductService);
        container.bind(FindProductByNameService).to(FindProductByNameService);
        container.bind(FindProductsService).to(FindProductsService);

        // external containers
        const eventEmitterModule = new EventEmitterModule();
        const eventEmitterContainer = eventEmitterModule.start();

        return Container.merge(container, eventEmitterContainer);
    }

    private setupControllers(container: interfaces.Container, app: Express) {
        const server = new InversifyExpressServer(container, null, null, app);

        server.build();

        return server;
    }
}
