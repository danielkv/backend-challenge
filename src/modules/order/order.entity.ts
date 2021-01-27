import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderProductEntity } from './order-product.entity';

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order, { cascade: true })
    products: OrderProductEntity[];

    @Column('float')
    total: number;
}
