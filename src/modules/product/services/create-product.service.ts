import { inject, injectable } from 'inversify';
import { DeepPartial } from '../../common/deep-partial.type';
import { IEventEmitter } from '../../event-emitter/emitter.interface';
import { ProductDTO } from '../dto/product.dto';
import { ProductEntity } from '../product.entity';
import { IProductRepository } from '../repository/product-repository.interface';

@injectable()
export class CreateProductService {
    constructor(
        @inject('ProductRepository') private productRepository: IProductRepository,
        @inject('EventEmitter') private eventEmitter: IEventEmitter,
    ) {}

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
