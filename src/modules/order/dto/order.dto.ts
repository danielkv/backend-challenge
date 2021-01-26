import { OrderProductDTO } from './order-product.dto';

export class OrderDTO {
    id?: number;

    products: OrderProductDTO[];

    total?: number;
}
