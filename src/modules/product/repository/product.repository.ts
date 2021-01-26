import { injectable } from 'inversify';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../common/base.repository';
import { ProductEntity } from '../product.entity';
import { IProductRepository } from './product-repository.interface';

@injectable()
@EntityRepository(ProductEntity)
export class ProductRepository extends BaseRepository<ProductEntity> implements IProductRepository {
    findByName(productName: string): Promise<ProductEntity> {
        const query = this.createQueryBuilder('product');

        query.where('product.name LIKE :name');

        query.setParameters({ name: `%${productName}%` });

        console.log(query.getSql());

        return query.getOne();
    }
}
