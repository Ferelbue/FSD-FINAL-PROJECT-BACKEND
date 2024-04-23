import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity('deals')
@Unique("user_deal_unique", ["userUser", "product", "deal_date"])
export class Deal extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.dealsAsOwner, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "userOwner_id" })
    userOwner!: User;

    @ManyToOne(() => User, user => user.dealsAsUser, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "userUser_id" })
    userUser!: User;

    @ManyToOne(() => Product, product => product.deals, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "product_id" })
    product!: Product;

    @Column({ type: 'boolean', default: false })
    userUser_confirm!: boolean;

    @Column({ type: 'boolean', default: false })
    userOwner_confirm!: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    deal_date!: Date;
}