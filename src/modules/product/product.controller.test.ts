import { connectionUtils } from '../database/create-connection.service';
import request from 'supertest';
import express, { response } from 'express';
import { setupServer } from '../../setup/server.setup';

beforeAll(async (done) => {
    await connectionUtils.create();
    done();
});

afterAll(async (done) => {
    await connectionUtils.close();
    done();
});

describe('Products', () => {
    it('Return a list of products', async () => {
        const app = express();

        await setupServer(app);

        await request(app).get('/products').expect(200);
    });

    it('Find product by Name', async () => {
        const app = express();

        await setupServer(app);

        await request(app).get('/products/kiwi').expect(200);
    });

    it('Incremente stock of a product', async () => {
        const app = express();

        await setupServer(app);

        await request(app)
            .post('/products')
            .send({ product: { name: 'Kiwi', quantity: 2 } })
            .expect(200);
    });
});
