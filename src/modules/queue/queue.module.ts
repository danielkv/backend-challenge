import { ContainerModule, interfaces } from 'inversify';

import { RabbitMQService } from './rabbitmq.service';

export class QueueModule {
    public module: interfaces.ContainerModule;

    start() {
        this.module = this.createModule();

        return this.module;
    }

    private createModule() {
        // create container
        const module = new ContainerModule((bind: interfaces.Bind) => {
            // repository
            bind('QueueService').to(RabbitMQService);
        });
        return module;
    }
}
