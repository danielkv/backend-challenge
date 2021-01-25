import { Repository } from 'typeorm';
import { ProductEntity } from '../product.entity';

/**
 * Product interface to connect to the repository (DB, memory, etc)
 * it can be usefull when is needed to add some features to this repository
 */
export interface IProductRepository extends Repository<ProductEntity> {
    findByName(productName: string): Promise<ProductEntity>;
}
