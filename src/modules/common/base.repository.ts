import { Repository } from 'typeorm';

/**
 * Base repository in case need to extend functionalities
 */
export class BaseRepository<Repo> extends Repository<Repo> {}
