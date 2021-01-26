import { inject, injectable } from 'inversify';
import { Pagination } from '../../common/pagination.type';
import { OrderEntity } from '../order.entity';
import { IOrderRepository } from '../repository/order-repository.interface';

@injectable()
export class ListOrderService {
    constructor(@inject('OrderRepository') private orderRepository: IOrderRepository) {}

    execute(pagination?: Pagination): Promise<OrderEntity[]> {
        if (!pagination?.offset && !pagination?.limit) return this.orderRepository.find();

        return this.orderRepository.find({ skip: pagination.offset, take: pagination.limit });
    }
}
