import { AbstractRepository, Repository } from 'typeorm';

/**
 * Base repository in case need to extend functionalities
 */
export class BaseRepository<Entity> extends Repository<Entity> {}
