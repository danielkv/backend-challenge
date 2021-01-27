import { NextFunction, Request, Response } from 'express';
import {
    controller,
    httpGet,
    httpPost,
    next,
    queryParam,
    requestBody,
    requestParam,
    response,
} from 'inversify-express-utils';
import { ObjectLiteral } from '../common/object-literal.type';
import { Pagination } from '../common/pagination.type';
import { OrderList } from './dto/order-list.dto';
import { OrderProductDTO } from './dto/order-product.dto';
import { CreateOrderService } from './services/create-order.service';
import { FindOrderByIdService } from './services/find-order.service';
import { ListOrderService } from './services/list-orders.service';

/**
 * It controls the products requests /  responses
 */
@controller('/orders')
export class OrderController {
    constructor(
        private findOrderByIdService: FindOrderByIdService,
        private listOrderService: ListOrderService,
        private createOrderService: CreateOrderService,
    ) {}

    @httpPost('/')
    async create(@requestBody() body: ObjectLiteral, @response() res: Response, @next() next: NextFunction) {
        const products: OrderProductDTO[] = body.products;
        if (!products || !products?.length) throw new Error('No products in body');

        const order = await this.createOrderService.execute(products);

        res.json(order);
    }

    @httpGet('/:id')
    async findOne(@requestParam('id') orderId: number, @response() res: Response, @next() next: NextFunction) {
        // check if orderId was provided
        if (!orderId) return next(new Error('Order ID not provided'));

        // find customer by id
        const order = await this.findOrderByIdService.execute(orderId).catch((err) => next(err));

        // check if order exists, throw an Error case no order was found
        if (!order) return next(new Error('Order not found'));

        // response
        return res.json(order);
    }

    @httpGet('/')
    async findMany(
        @response() res: Response,
        @next() next: NextFunction,
        @queryParam('offset') offset?: number,
        @queryParam('limit') limit?: number,
    ) {
        const pagination: Pagination = {
            offset: offset ? Number(offset) : undefined,
            limit: limit ? Number(limit) : undefined,
        };

        try {
            // find products
            const orders = await this.listOrderService.execute(pagination);

            // count all products
            const counstOrders = await this.listOrderService.execute();

            // response
            const response: OrderList = {
                items: orders,
                pageInfo: {
                    itemsTotal: counstOrders.length,
                    ...pagination,
                },
            };

            res.json(response);
        } catch (err) {
            next(err);
        }
    }
}
