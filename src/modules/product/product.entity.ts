import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column()
    name: string;

    @Column({ type: 'float' })
    price: number;

    @Column('int')
    quantity: number;
}
