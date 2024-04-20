import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Check, OneToMany } from "typeorm";
import { User } from "./User";
import { Category } from "./Category";
import { Deal } from "./Deal";
import { Message } from "./Message";
import { Review } from "./Review";
import { FavoriteProduct } from "./FavoriteProduct";


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
    @Check("starts_check", "starts >= 0 AND starts <= 5")
    starts!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    hourPrice!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    dayPrice!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    depositPrice!: number;

    @Column({ type: 'boolean', default: true })
    available!: boolean;

    @ManyToOne(() => Category, category => category.products)
    @JoinColumn({ name: "category_id" })
    category!: Category;

    @ManyToOne(() => User, user => user.products)
    @JoinColumn({ name: "owner_id" })
    owner!: User;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at!: Date;
    
    @OneToMany(() => Deal, deal => deal.product)
    deals!: Deal[];
    
    @OneToMany(() => Message, message => message.product)
    messages!: Message[];
    
    @OneToMany(() => Review, review => review.product)
    reviews!: Review[];
    
    @OneToMany(() => FavoriteProduct, favoriteProduct => favoriteProduct.product)
    favoriteProducts!: FavoriteProduct[];
}