import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role"
import { Product } from "./Product"
import { Deal } from "./Deal"
import { Message } from "./Message"
import { FavoriteProduct } from "./FavoriteProduct"
import { Review } from "./Review"

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 50 })
    name!: string;

    @Column({ length: 50 })
    lastName!: string;

    @Column({ length: 100, unique: true })
    email!: string;

    @Column({ length: 255 })
    image!: string;

    @Column({ length: 50 })
    city!: string;

    @Column({ length: 255 })
    passwordHash!: string;

    @Column({ type: 'boolean', default: true })
    is_active!: boolean;

    @ManyToOne(() => Role, role => role.users)
    @JoinColumn({ name: "role_id" })
    role!: Role;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at!: Date;

    @OneToMany(() => Product, product => product.owner)
    products!: Product[];

    @OneToMany(() => Deal, deal => deal.userOwner)
    dealsAsOwner!: Deal[];

    @OneToMany(() => Deal, deal => deal.userUser)
    dealsAsUser!: Deal[];

    @OneToMany(() => Message, message => message.userOwner)
    messagesAsOwner!: Message[];

    @OneToMany(() => Message, message => message.userUser)
    messagesAsUser!: Message[];

    @OneToMany(() => FavoriteProduct, favoriteProduct => favoriteProduct.user)
    favoriteProducts!: FavoriteProduct[];

    @OneToMany(() => Review, review => review.reviewer)
    reviews: Review[] | undefined;
}