import { Router, Express } from 'express';
import { ProductModule } from '../modules/product/product.module';

export function setupModules(app: Express) {
    const routes = Router({
        caseSensitive: false,
        mergeParams: false,
        strict: false,
    });

    const productModule = new ProductModule();
    productModule.start(app);

    return routes;
}
