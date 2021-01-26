import { inject, injectable } from 'inversify';
import { ProductEntity } from '../product.entity';
import { IProductRepository } from '../repository/product-repository.interface';

@injectable()
export class UpdateProductStockService {
    constructor(@inject('ProductRepository') private productRepository: IProductRepository) {}

    /**
     * Update the stock of a product within a given ID
     * @param productId Product ID
     * @param qtyToUpdate Quantity to update 1 | -1 | -3 ...
     */
    async execute(productId: number, qtyToUpdate: number): Promise<ProductEntity> {
        const product = await this.productRepository.findOne(productId);

        const newQuantity = product.quantity + qtyToUpdate;

        /**
         * Check if the newQuantity is less than 0
         * Should not happen, but if it does, throws an Error
         **/
        if (newQuantity < 0) throw new Error("Product stock can't be lower than 0");

        // update in repository
        const updatedProduct = await this.productRepository.save({ ...product, quantity: newQuantity });

        return updatedProduct;
    }
}
