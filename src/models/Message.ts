import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";

@Entity('messages')
export class Message extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    message!: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userOwner_id" })
    userOwner!: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: "userUser_id" })
    userUser!: User;

    @ManyToOne(() => Product)
    @JoinColumn({ name: "product_id" })
    product!: Product;

    @Column({ type: 'boolean', default: false })
    userOwner_notification!: boolean;

    @Column({ type: 'boolean', default: false })
    userUser_notification!: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;
}