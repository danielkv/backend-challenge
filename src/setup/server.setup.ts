import { Express, json } from 'express';
import cors from 'cors';
//import { setupRoutes } from './routes.setup';
import { errorHandler } from '../error-handler';

export function setupServer(app: Express): Express {
    app.use(json());
    app.use(cors());

    // setup routes
    /* const routes = setupRoutes();
    app.use(routes); */

    // setup error handler
    app.use(errorHandler);

    return app;
}
