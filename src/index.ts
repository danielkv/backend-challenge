'use strict';

import 'dotenv/config';

import express from 'express';

import { setupServer } from './setup/server.setup';

async function bootstrap() {
    // express initial setup
    const app = express();

    setupServer(app);

    // start app
    app.listen(3001, () => {
        console.log('🚀 Server started on http://localhost:3001');
    });
}

bootstrap();
