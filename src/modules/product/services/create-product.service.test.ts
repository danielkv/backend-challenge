import { getConnection, getCustomRepository } from 'typeorm';
import { connection } from '../../database/create-connection.service';
import { ProductList } from '../dto/product-list.dto';
import { ProductEntity } from '../product.entity';
import { ProductRepository } from '../repository/product.repository';
import { FindProductByNameService } from './find-product-by-name.service';
import { FindProductsService } from './find-products.service';

beforeAll(async (done) => {
    await connection.create();
    return done();
});

afterAll(async (done) => {
    await connection.close();
    return done();
});

test('Find many products', async (done) => {
    const productRepository = getCustomRepository(ProductRepository);
    const findProductsService = new FindProductsService(productRepository);

    const products = await findProductsService.execute();

    expect(products[0]).toMatchObject(new ProductEntity());
    return done();
});

test('Find product by name', async (done) => {
    const productRepository = getCustomRepository(ProductRepository);
    const findProductByNameService = new FindProductByNameService(productRepository);

    await expect(findProductByNameService.execute('garlic')).resolves.toMatchObject({
        id: 8,
        name: 'Garlic',
        price: 6.21,
        quantity: 0,
    });

    return done();
});
