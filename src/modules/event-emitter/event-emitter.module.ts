import { ContainerModule, interfaces } from 'inversify';
import { EventEmitterService } from './event-emitter.service';

export class EventEmitterModule {
    public container: interfaces.ContainerModule;

    start() {
        // create container
        this.container = this.createModule();

        return this.container;
    }

    createModule() {
        const module = new ContainerModule((bind: interfaces.Bind) => {
            // services
            bind('EventEmitter').to(EventEmitterService);
        });

        return module;
    }
}
