import { inject, injectable } from 'inversify';
import { ProductEntity } from '../product.entity';
import { IProductRepository } from '../repository/product-repository.interface';

@injectable()
export class FindProductByNameService {
    constructor(@inject('ProductRepository') private productRepository: IProductRepository) {}

    /**
     * Search product by name
     */
    async execute(productName: string): Promise<ProductEntity> {
        return this.productRepository.findByName(productName);
    }
}
