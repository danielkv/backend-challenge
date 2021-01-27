import { IEventEmitter } from './emitter.interface';
import { EventEmitter } from 'events';
import { ObjectLiteral } from 'typeorm';
import { injectable } from 'inversify';

const eventEmitter = new EventEmitter();

/**
 * These methods can be replaced for any other funcionalities
 */
@injectable()
export class EventEmitterService implements IEventEmitter {
    emit<T = ObjectLiteral>(event: string, args: T): void {
        // don't emit events if it's test enviroment, it can cause errors
        if (process.env.NODE_ENV === 'test') return;

        setImmediate(() => eventEmitter.emit(event, args));
    }

    addListener<T = any>(event: string, fn: (args: T) => void): void {
        eventEmitter.addListener(event, fn);
    }
}
