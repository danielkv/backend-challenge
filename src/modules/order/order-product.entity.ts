import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from '../product/product.entity';
import { OrderEntity } from './order.entity';

@Entity('order_products')
export class OrderProductEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column()
    name: string;

    @Column({ type: 'float' })
    price: number;

    @Column('int')
    quantity: number;

    @Column('int', { nullable: true })
    referenceProductId: number;

    @Column()
    orderId: number;

    @ManyToOne(() => OrderEntity, (order) => order.products)
    @JoinColumn({ name: 'orderId', referencedColumnName: 'id' })
    order: OrderEntity;

    @OneToOne(() => ProductEntity, { onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'referenceProductId', referencedColumnName: 'id' })
    referenceProduct: OrderEntity;
}
