import { ContainerModule, interfaces } from 'inversify';
import { Express } from 'express';
import { ProductRepository } from '../product/repository/product.repository';
import { OrderRepository } from './repository/order.repository';
import { CreateOrderService } from './services/create-order.service';
import { FindOrderByIdService } from './services/find-order.service';
import { ListOrderService } from './services/list-orders.service';
import { connectionUtils } from '../database/create-connection.service';
import { EventEmitterService } from '../event-emitter/event-emitter.service';

export class OrderModule {
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
            bind('OrderRepository').toConstantValue(connectionUtils.connection.getCustomRepository(OrderRepository));

            // services
            bind(CreateOrderService).to(CreateOrderService);
            bind(FindOrderByIdService).to(FindOrderByIdService);
            bind(ListOrderService).to(ListOrderService);
        });

        return module;
    }

    private setupControllers() {
        require('./order.controller');
    }
}
