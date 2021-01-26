'use strict';

import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';

import { setupServer } from './setup/server.setup';
import { setupDB } from './setup/db.setup';

async function bootstrap() {
    // database
    await setupDB();

    // express initial setup
    const app = express();
    await setupServer(app);

    // start app
    app.listen(3001, () => {
        console.log('🚀 Server started on http://localhost:3001');
    });
}

bootstrap();
