import { Pagination } from '../../common/pagination.type';
import { OrderEntity } from '../order.entity';
import { IOrderRepository } from '../repository/order-repository.interface';

export class ListOrderService {
    constructor(private orderRepository: IOrderRepository) {}

    execute(pagination?: Pagination): Promise<OrderEntity[]> {
        if (!pagination) return this.orderRepository.find();

        return this.orderRepository.find({ skip: pagination.offset, take: pagination.limit });
    }
}
