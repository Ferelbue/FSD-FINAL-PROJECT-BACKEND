import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity('favorite_products')
@Unique("user_favourite_unique", ["user", "product"])
export class FavoriteProduct extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.favoriteProducts)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @ManyToOne(() => Product, product => product.favoriteProducts)
    @JoinColumn({ name: "product_id" })
    product!: Product;
}