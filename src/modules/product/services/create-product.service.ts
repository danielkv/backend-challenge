import { DeepPartial } from '../../common/deep-partial.type';
import { ProductDTO } from '../dto/product.dto';
import { ProductEntity } from '../product.entity';
import { IProductRepository } from '../repository/product-repository.interface';

export class CreateProductService {
    constructor(private productRepository: IProductRepository) {}

    /**
     * Insert new product in repository
     */
    async execute(product: DeepPartial<ProductDTO>): Promise<ProductEntity> {
        const instance = this.productRepository.create(product);

        await this.productRepository.insert(instance);

        return instance;
    }
}
