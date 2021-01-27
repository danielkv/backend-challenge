import { Express, json } from 'express';
import cors from 'cors';
import { setupModules } from './modules.setup';
import { errorHandler } from '../error-handler';
import { interfaces } from 'inversify';

export async function setupServer(app: Express): Promise<interfaces.Container> {
    app.use(json());
    app.use(cors());

    // setup modules
    const container = await setupModules(app);

    // setup error handler
    app.use(errorHandler);

    return container;
}
