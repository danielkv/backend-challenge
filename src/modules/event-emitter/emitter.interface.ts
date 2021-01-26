import { ObjectLiteral } from '../common/object-literal.type';

export interface IEventEmitter {
    emit<T = ObjectLiteral>(event: string, args: T): void;

    addListener<T = ObjectLiteral>(event: string, fn: (args: T) => void): void;
}
