import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Check } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity('reviews')
export class Review extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 20 })
    name!: string;

    @Column({ type: 'varchar', length: 50 })
    description!: string;

    @Column({ type: 'int' })
    @Check("starts_check", "starts >= 0 AND starts <= 5")
    starts!: number;

    @ManyToOne(() => Product, product => product.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "product_id" })
    product!: Product;
    
    @ManyToOne(() => User, reviewer => reviewer.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "reviewer_id" })
    reviewer!: User;
}