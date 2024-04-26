import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { OneToMany } from "typeorm";

@Entity('categories')
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 50 })
    name!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at!: Date;
    
    @OneToMany(() => Product, product => product.category)
    products!: Product[];
}