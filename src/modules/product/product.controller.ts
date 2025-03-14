import { NextFunction, Request, Response } from 'express';
import { controller, httpGet, httpPost, requestBody, response, next } from 'inversify-express-utils';
import { ObjectLiteral } from '../common/object-literal.type';
import { Pagination } from '../common/pagination.type';
import { OrderProductDTO } from '../order/dto/order-product.dto';
import { ProductList } from './dto/product-list.dto';
import { CreateProductService } from './services/create-product.service';
import { FindProductByNameService } from './services/find-product-by-name.service';
import { FindProductsService } from './services/find-products.service';

/**
 * It controls the products requests /  responses
 */
@controller('/products')
export class ProductController {
    constructor(
        private findProductByNameService: FindProductByNameService,
        private findProductsService: FindProductsService,
        private createProductService: CreateProductService,
    ) {}

    @httpPost('/')
    async create(@requestBody() body: ObjectLiteral, @response() res: Response, @next() next: NextFunction) {
        const product: OrderProductDTO = body.product;
        if (!product) throw new Error('No product in body');

        const productCreated = await this.createProductService.execute(product);

        res.json(productCreated);
    }

    @httpGet('/:name')
    async findOne(req: Request, res: Response, next: NextFunction) {
        // extract body params and check if it's defined
        const productName = req?.params?.name;
        if (!productName) return next(new Error('Product name not provided'));

        // find customer by id
        const product = await this.findProductByNameService.execute(productName).catch((err) => next(err));

        // response
        return res.json(product);
    }

    @httpGet('/')
    async findMany(req: Request, res: Response, next: NextFunction) {
        const pagination: Pagination = {
            offset: req?.query?.offset ? Number(req.query.offset) : undefined,
            limit: req?.query?.limit ? Number(req.query.limit) : undefined,
        };

        try {
            // find products
            const products = await this.findProductsService.execute(pagination);

            // count all products
            const countProducts = await this.findProductsService.execute();

            // response
            const response: ProductList = {
                items: products,
                pageInfo: {
                    itemsTotal: countProducts.length,
                    ...pagination,
                },
            };

            res.json(response);
        } catch (err) {
            next(err);
        }
    }
}
