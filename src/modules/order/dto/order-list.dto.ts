import { PageInfo } from '../../common/dto/page-info';
import { OrderEntity } from '../order.entity';

export class OrderList {
    items: OrderEntity[];
    pageInfo: PageInfo;
}
