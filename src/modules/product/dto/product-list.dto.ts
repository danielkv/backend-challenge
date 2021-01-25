import { PageInfo } from '../../common/dto/page-info';
import { ProductEntity } from '../product.entity';

export class ProductList {
    items: ProductEntity[];
    pageInfo: PageInfo;
}
