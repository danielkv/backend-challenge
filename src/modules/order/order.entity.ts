import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from '../product/product.entity';

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @ManyToMany(() => ProductEntity, { cascade: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
    @JoinTable({
        name: 'order_products',
        joinColumn: { name: 'orderId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'productId', referencedColumnName: 'id' },
    })
    products: ProductEntity[];

    @Column('float')
    total: number;
}
