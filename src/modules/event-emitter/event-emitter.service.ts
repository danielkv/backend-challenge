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
        setImmediate(() => eventEmitter.emit(event, args));
    }

    addListener<T = any>(event: string, fn: (args: T) => void): void {
        eventEmitter.addListener(event, fn);
    }
}
