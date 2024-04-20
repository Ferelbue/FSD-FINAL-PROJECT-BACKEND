import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity('deals')
@Unique("user_deal_unique", ["userUser", "product", "deal_date"])
export class Deal extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.dealsAsOwner)
    @JoinColumn({ name: "userOwner_id" })
    userOwner!: User;

    @ManyToOne(() => User, user => user.dealsAsUser)
    @JoinColumn({ name: "userUser_id" })
    userUser!: User;

    @ManyToOne(() => Product, product => product.deals)
    @JoinColumn({ name: "product_id" })
    product!: Product;

    @Column({ type: 'boolean', default: false })
    user_confirm!: boolean;

    @Column({ type: 'boolean', default: false })
    product_confirm!: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    deal_date!: Date;
}