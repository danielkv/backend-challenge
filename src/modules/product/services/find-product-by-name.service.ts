import { DeepPartial } from '../../common/deep-partial.type';
import { ProductDTO } from '../dto/product.dto';
import { ProductEntity } from '../product.entity';
import { IProductRepository } from '../repository/product-repository.interface';

export class FindProductByNameService {
    constructor(private productRepository: IProductRepository) {}

    /**
     * Search product by name
     */
    async execute(productName: string): Promise<ProductEntity> {
        return this.productRepository.findByName(productName);
    }
}
