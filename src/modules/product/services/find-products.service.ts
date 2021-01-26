import { inject, injectable } from 'inversify';
import { Pagination } from '../../common/pagination.type';
import { ProductEntity } from '../product.entity';
import { IProductRepository } from '../repository/product-repository.interface';

@injectable()
export class FindProductsService {
    constructor(@inject('ProductRepository') private productRepository: IProductRepository) {}

    /**
     * Find many products
     */
    async execute(pagination?: Pagination): Promise<ProductEntity[]> {
        if (!pagination?.limit && !pagination?.offset) return this.productRepository.find();

        return this.productRepository.find({ skip: pagination.offset, take: pagination.limit });
    }
}
