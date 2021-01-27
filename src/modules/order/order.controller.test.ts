import { connectionUtils } from '../database/create-connection.service';
import request from 'supertest';
import express, { response } from 'express';
import { setupServer } from '../../setup/server.setup';
import { UpdateProductStockService } from '../product/services/update-product-stock.service';

beforeAll(async (done) => {
    await connectionUtils.create();
    done();
});

afterAll(async (done) => {
    await connectionUtils.close();
    done();
});

describe('Orders', () => {
    it('Return a list of order', async () => {
        const app = express();

        await setupServer(app);

        await request(app).get('/orders').expect(200);
    });

    it('Find order by ID', async () => {
        const app = express();

        await setupServer(app);

        await request(app).get('/orders/5').expect(200);
    });

    it('Create a new order, product in stock', async () => {
        const app = express();

        const container = await setupServer(app);

        const productStockService = container.get(UpdateProductStockService);

        // set product 'kiwi' in stock
        await productStockService.execute(4, 2);

        await request(app)
            .post('/orders')
            .send({ products: [{ name: 'Kiwi', quantity: 1 }] })
            .expect(200);
    });

    it('Create a new order, out of stock', async () => {
        const app = express();

        await setupServer(app);

        await request(app)
            .post('/orders')
            .send({ products: [{ name: 'Kiwi', quantity: 100 }] })
            .expect((res) => {
                if (res.body.message !== "Product Kiwi doesn't have this quantity in stock")
                    throw new Error('Not right error');
            })
            .expect(500);
    });
});
