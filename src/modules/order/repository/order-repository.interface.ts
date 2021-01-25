import { Repository } from 'typeorm';
import { OrderEntity } from '../order.entity';

/**
 * Product interface to connect to the repository (DB, memory, etc)
 * it can be usefull when is needed to add some features to this repository
 */
export interface IOrderRepository extends Repository<OrderEntity> {}
