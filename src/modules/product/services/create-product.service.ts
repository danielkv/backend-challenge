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
     * If product already exists, add the quantity to stock (search for name)
     */
    async execute(product: DeepPartial<ProductDTO>): Promise<ProductEntity> {
        const productExists = await this.productRepository.findOne({ where: { name: product.name } });

        if (!productExists) {
            // create new product
            const createdProduct = await this.productRepository.save(product);

            // events
            this.eventEmitter.emit('createProduct', { product: createdProduct });

            return createdProduct;
        } else {
            // add the quantity to product stock
            const newQuantity = productExists.quantity + (product.quantity || 1);

            const updatedProduct = await this.productRepository.save({ ...productExists, quantity: newQuantity });

            return updatedProduct;
        }
    }
}
