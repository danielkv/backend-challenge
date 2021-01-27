import { inject, injectable } from 'inversify';
import { In } from 'typeorm';
import { DeepPartial } from '../../common/deep-partial.type';
import { IEventEmitter } from '../../event-emitter/emitter.interface';
import { ProductEntity } from '../../product/product.entity';
import { IProductRepository } from '../../product/repository/product-repository.interface';
import { OrderProductDTO } from '../dto/order-product.dto';
import { OrderDTO } from '../dto/order.dto';
import { OrderEntity } from '../order.entity';
import { IOrderRepository } from '../repository/order-repository.interface';

@injectable()
export class CreateOrderService {
    constructor(
        @inject('OrderRepository') private orderRepository: IOrderRepository,
        @inject('ProductRepository') private productRepository: IProductRepository,
        @inject('EventEmitter') private eventEmitter: IEventEmitter,
    ) {}

    /**
     * Create order and insert in repository
     * - Loops in the products property to check the stock
     * - Sum and injects the total order value in object
     */
    async execute(products: DeepPartial<OrderProductDTO>[]): Promise<OrderEntity> {
        // it will throw an Error in case fails (product not in stock)
        await this.checksProductStock(products);

        // Sum and injects the total order value in object
        const totalValue = this.sumProductsValue(products);

        // save in repository
        const createdOrder = await this.orderRepository.save({
            products,
            total: totalValue,
        });

        // events
        this.eventEmitter.emit('createOrder', { order: createdOrder });

        return createdOrder;
    }

    /**
     * Return the total value for the order
     */
    private sumProductsValue(products: DeepPartial<OrderProductDTO>[]): number {
        const total = products.reduce<number>((value, product) => {
            const productPrice = product.quantity * product.price;

            // update property price with the right value
            product.price = productPrice;

            return value + productPrice;
        }, 0);

        return total;
    }

    /**
     * Check all products stock
     * returns the products of DB with prices if success or throws Error case fail
     *
     *  - The property **referenceProductId** in **OrderProductDTO** is used to check the stock in each product
     *
     * @param productsToCheck products to check
     */
    private async checksProductStock(productsToCheck: DeepPartial<OrderProductDTO>[]): Promise<ProductEntity[]> {
        // Load the actual quantity in stock
        const productsInstances = await this.productRepository.find({
            where: { name: In(productsToCheck.map((orderProduct) => orderProduct.name)) },
        });

        // try to find ONE product that doesn't have the needed quantity in stock
        const checked = productsToCheck.find((orderProduct) => {
            const qtyNeeded = orderProduct.quantity;
            if (qtyNeeded <= 0) throw new Error(`Quantity in product ${orderProduct.name} has to be at leat 1`);

            const referenceProduct = productsInstances.find(
                (productsInstance) => productsInstance.name === orderProduct.name,
            );

            // check if found product
            if (!referenceProduct) throw new Error(`Product ${orderProduct.name} not found`);

            // inject product ID reference and indivial price
            orderProduct.referenceProductId = referenceProduct.id;
            orderProduct.price = referenceProduct.price;

            // product in stock?
            const qtyInStock = referenceProduct.quantity;
            return qtyNeeded > qtyInStock;
        });

        // if checked IS NOT empty, some of the products doesn't have the needed quantitt in stock
        // if checked IS empty, it means that all products have the quantity in stock
        if (checked) throw new Error(`Product ${checked.name} doesn't have this quantity in stock`);

        // returns true in case gets here
        return productsInstances;
    }
}
