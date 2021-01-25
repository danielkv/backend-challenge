import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../common/base.repository';
import { OrderEntity } from '../order.entity';
import { IOrderRepository } from './order-repository.interface';

/**
 * This class used as a sigleton to mantain the customers saved in memory
 */
@EntityRepository(OrderEntity)
export class ProductRepository extends BaseRepository<OrderEntity> implements IOrderRepository {}
