import { inject, injectable } from 'inversify';
import { OrderEntity } from '../order.entity';
import { IOrderRepository } from '../repository/order-repository.interface';

@injectable()
export class FindOrderByIdService {
    constructor(@inject('OrderRepository') private orderRepository: IOrderRepository) {}

    async execute(id: number): Promise<OrderEntity> {
        const order = await this.orderRepository.findOne({ where: { id } });

        if (!order) throw new Error('Order not found');

        return order;
    }
}
