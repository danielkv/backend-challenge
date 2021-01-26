import { Router } from 'express';
import { Container, interfaces } from 'inversify';
import { EventEmitterService } from './event-emitter.service';

export class EventEmitterModule {
    public container: interfaces.Container;

    start() {
        // create container
        this.container = this.bindServices();

        return this.container;
    }

    bindServices() {
        // create container
        const container = new Container();

        // services
        container.bind('EventEmitter').to(EventEmitterService);

        return container;
    }
}
