import { Router } from 'express';
import { ProductDTO } from '../modules/product/dto/product.dto';
import { ProductController } from '../modules/product/product.controller';
import { ProductModule } from '../modules/product/product.module';

export function setupRoutes() {
    const routes = Router();

    const productModule = ProductModule();

    routes.get('/products', async (req, res, next) => {
        await productModule.get(ProductController).findMany(req, res, next);
    });

    routes.get('/products/:name', async (req, res, next) => {
        await productModule.get(ProductController).findOne(req, res, next);
    });

    return routes;
}
