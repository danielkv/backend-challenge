import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from '../product/product.entity';
import { OrderProductEntity } from './order-product.entity';

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.referenceProduct, { cascade: true })
    products: OrderProductEntity[];

    @Column('float')
    total: number;
}
