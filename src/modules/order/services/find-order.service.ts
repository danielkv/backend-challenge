import { OrderEntity } from '../order.entity';
import { IOrderRepository } from '../repository/order-repository.interface';

export class FindOrderByIdService {
    constructor(private orderRepository: IOrderRepository) {}

    async execute(id: number): Promise<OrderEntity> {
        const order = await this.orderRepository.findOne({ where: { id } });

        if (!order) throw new Error('Order not found');

        return order;
    }
}
