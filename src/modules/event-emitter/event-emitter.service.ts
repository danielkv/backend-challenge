import { IEventEmitter } from './emitter.interface';
import { EventEmitter } from 'events';
import { ObjectLiteral } from 'typeorm';

const eventEmitter = new EventEmitter();

/**
 * These methods can be replaced for any other funcionalities
 */
export class EventEmitterService implements IEventEmitter {
    emit<T = ObjectLiteral>(event: string, args: T): void {
        eventEmitter.emit(event, args);
    }

    addListener<T = ObjectLiteral>(event: string, fn: (args: T) => void): void {
        eventEmitter.addListener(event, fn);
    }
}
