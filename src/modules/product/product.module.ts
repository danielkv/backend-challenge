import { Container } from 'inversify';
import { getConnection, getCustomRepository } from 'typeorm';
import { connectionUtils } from '../database/create-connection.service';
import { EventEmitterModule } from '../event-emitter/event-emitter.module';
import { ProductController } from './product.controller';
import { ProductRepository } from './repository/product.repository';

import { CreateProductService } from './services/create-product.service';
import { FindProductByNameService } from './services/find-product-by-name.service';
import { FindProductsService } from './services/find-products.service';

export function ProductModule() {
    // create container
    const container = new Container({ skipBaseClassChecks: false });

    container
        .bind('ProductRepository')
        .toConstantValue(connectionUtils.connection.getCustomRepository(ProductRepository));

    // services
    container.bind(CreateProductService).to(CreateProductService);
    container.bind(FindProductByNameService).to(FindProductByNameService);
    container.bind(FindProductsService).to(FindProductsService);

    // controller
    container.bind(ProductController).to(ProductController);

    return Container.merge(container, EventEmitterModule);
}
