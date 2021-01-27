import { Express, json } from 'express';
import cors from 'cors';
import { setupModules } from './modules.setup';
import { errorHandler } from '../error-handler';

export async function setupServer(app: Express): Promise<Express> {
    app.use(json());
    app.use(cors());

    // setup modules
    setupModules(app);

    // setup error handler
    app.use(errorHandler);

    return app;
}
