import { DeepPartial } from '../../common/deep-partial.type';
import { Pagination } from '../../common/pagination.type';
import { ProductDTO } from '../dto/product.dto';
import { ProductEntity } from '../product.entity';
import { IProductRepository } from '../repository/product-repository.interface';

export class FindProductsService {
    constructor(private productRepository: IProductRepository) {}

    /**
     * Find many products
     */
    async execute(pagination?: Pagination): Promise<ProductEntity[]> {
        if (!pagination) return this.productRepository.find();

        return this.productRepository.find({ take: pagination.limit, skip: pagination.offset });
    }
}
