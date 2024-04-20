import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Check } from "typeorm";
import { Product } from "./Product";

@Entity('reviews')
@Check("starts_check", "starts >= 0 AND starts <= 5")
export class Review extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 20 })
    name!: string;

    @Column({ type: 'varchar', length: 50 })
    description!: string;

    @Column({ type: 'int' })
    starts!: number;

    @ManyToOne(() => Product)
    @JoinColumn({ name: "product_id" })
    product!: Product;
}