import { Container } from 'inversify';
import { EventEmitterModule } from '../event-emitter/event-emitter.module';
import { ProductRepository } from '../product/repository/product.repository';
import { OrderRepository } from './repository/order.repository';
import { CreateOrderService } from './services/create-order.service';
import { FindOrderByIdService } from './services/find-order.service';
import { ListOrderService } from './services/list-orders.service';

function bootstrapContainer() {
    // create container
    const container = new Container();

    // services
    container.bind(CreateOrderService).to(CreateOrderService);
    container.bind(FindOrderByIdService).to(FindOrderByIdService);
    container.bind(ListOrderService).to(ListOrderService);

    // repository
    container.bind('OrderRepository').to(OrderRepository);
    container.bind('ProductRepository').to(ProductRepository);

    return Container.merge(container, EventEmitterModule);
}

export const OrderModule = bootstrapContainer();
