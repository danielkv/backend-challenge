import { OrderProductEntityDTO } from './order-product.dto';

export class OrderDTO {
    id?: number;

    products: OrderProductEntityDTO[];

    quantity: number;
}
