import { DeepPartial } from '../../common/deep-partial.type';
import { IEventEmitter } from '../../event-emitter/emitter.interface';
import { ProductDTO } from '../dto/product.dto';
import { ProductEntity } from '../product.entity';
import { IProductRepository } from '../repository/product-repository.interface';

export class CreateProductService {
    constructor(private productRepository: IProductRepository, private eventEmitter: IEventEmitter) {}

    /**
     * Insert new product in repository
     */
    async execute(product: DeepPartial<ProductDTO>): Promise<ProductEntity> {
        const createProduct = await this.productRepository.save(product);

        // events
        this.eventEmitter.emit('createProduct', { product: createProduct });

        return createProduct;
    }
}
