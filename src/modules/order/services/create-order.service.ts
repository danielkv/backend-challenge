import { In } from 'typeorm';
import { DeepPartial } from '../../common/deep-partial.type';
import { IEventEmitter } from '../../event-emitter/emitter.interface';
import { IProductRepository } from '../../product/repository/product-repository.interface';
import { OrderProductDTO } from '../dto/order-product.dto';
import { OrderDTO } from '../dto/order.dto';
import { OrderEntity } from '../order.entity';
import { IOrderRepository } from '../repository/order-repository.interface';

export class CreateOrderService {
    constructor(
        private orderRepository: IOrderRepository,
        private productRepository: IProductRepository,
        private eventEmitter: IEventEmitter,
    ) {}

    /**
     * Create order and insert in repository
     * - Loops in the products property to check the stock
     * - Sum and injects the total order value in object
     */
    async execute(order: DeepPartial<OrderDTO>): Promise<OrderEntity> {
        // it will throw an Error in case fails (product not in stock)
        await this.checksProductStock(order.products);

        // Sum and injects the total order value in object
        order.total = this.sumProductsValue(order.products);

        // save in repository
        const createdOrder = await this.orderRepository.save(order);

        // events
        this.eventEmitter.emit('createOrder', { order: createdOrder });

        return createdOrder;
    }

    /**
     * Return the total value for the order
     */
    private sumProductsValue(products: DeepPartial<OrderProductDTO>[]): number {
        const total = products.reduce<number>((value, product) => {
            return product.quantity * product.price;
        }, 0);

        return total;
    }

    /**
     * Check all products stock
     * returns true if success or throws Error case fail
     *
     *  - The property **referenceProductId** in **OrderProductDTO** is used to check the stock in each product
     *
     * @param productsToCheck products to check
     */
    private async checksProductStock(productsToCheck: DeepPartial<OrderProductDTO>[]): Promise<boolean> {
        // Load the actual quantity in stock
        const productsInstances = await this.productRepository.find({
            where: { id: In(productsToCheck.map((orderProduct) => orderProduct.referenceProductId)) },
        });

        // try to find ONE product that doesn't have the needed quantity in stock
        const checked = productsToCheck.find((orderProduct) => {
            const qtyNeeded = orderProduct.quantity;
            const referenceProduct = productsInstances.find(
                (productsInstance) => productsInstance.id === orderProduct.referenceProductId,
            );
            const qtyInStock = referenceProduct.quantity;

            return qtyNeeded > qtyInStock;
        });

        // if checked IS NOT empty, some of the products doesn't have the needed quantitt in stock
        // if checked IS empty, it means that all products have the quantity in stock
        if (checked) throw new Error(`Product ${checked.name} doesn't have this quantity in stock`);

        // returns true in case gets here
        return true;
    }
}
