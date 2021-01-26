import { injectable } from 'inversify';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from '../../common/base.repository';
import { OrderEntity } from '../order.entity';
import { IOrderRepository } from './order-repository.interface';

/**
 * This class used as a sigleton to mantain the customers saved in memory
 */
@injectable()
@EntityRepository(OrderEntity)
export class OrderRepository extends BaseRepository<OrderEntity> implements IOrderRepository {}
