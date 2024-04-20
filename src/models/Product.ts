import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Category } from "./Category";

@Entity('products')
export class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 50 })
    name!: string;

    @Column({ length: 50 })
    description!: string;

    @Column({ length: 255 })
    image!: string;

    @Column({ type: 'int' })
    starts!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    hourPrice!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    dayPrice!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    depositPrice!: number;

    @Column({ type: 'boolean', default: true })
    available!: boolean;

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category!: Category;

    @ManyToOne(() => User)
    @JoinColumn({ name: "owner_id" })
    owner!: User;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at!: Date;
}