import { Container } from 'inversify';
import { EventEmitterService } from './event-emitter.service';

function bootstrapContainer() {
    // create container
    const container = new Container();

    // services
    container.bind('EventEmitter').to(EventEmitterService);

    return container;
}

export const EventEmitterModule = bootstrapContainer();
