import { Express, json } from 'express';
import cors from 'cors';
import { setupRoutes } from './routes.setup';

export async function setupServer(app: Express): Promise<Express> {
    app.use(json());
    app.use(cors());

    // setup routes
    const routes = setupRoutes();
    app.use(routes);

    // setup error handler
    // app.use(errorHandler);

    return app;
}
