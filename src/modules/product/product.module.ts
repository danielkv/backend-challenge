import { ContainerModule, interfaces } from 'inversify';
import { connectionUtils } from '../database/create-connection.service';
import { ProductRepository } from './repository/product.repository';
import { CreateProductService } from './services/create-product.service';
import { FindProductByNameService } from './services/find-product-by-name.service';
import { FindProductsService } from './services/find-products.service';

export class ProductModule {
    public module: interfaces.ContainerModule;

    start() {
        this.module = this.createModule();

        this.setupControllers();

        return this.module;
    }

    private createModule() {
        // create container
        const module = new ContainerModule((bind: interfaces.Bind) => {
            // repository
            bind('ProductRepository').toConstantValue(
                connectionUtils.connection.getCustomRepository(ProductRepository),
            );

            // services
            bind(CreateProductService).to(CreateProductService);
            bind(FindProductByNameService).to(FindProductByNameService);
            bind(FindProductsService).to(FindProductsService);

            // external containers
            /*  const eventEmitterModule = new EventEmitterModule();
			const eventEmitterContainer = eventEmitterModule.start();

			//return Container.merge(container, eventEmitterContainer); */
        });
        return module;
    }

    private setupControllers() {
        require('./product.controller');
    }
}
