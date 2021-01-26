import { decorate, injectable } from 'inversify';
import { Repository } from 'typeorm';

decorate(injectable(), Repository);
/**
 * Base repository in case need to extend functionalities
 */
@injectable()
export class BaseRepository<Entity> extends Repository<Entity> {
    finddale() {
        return 'asd';
    }
}
