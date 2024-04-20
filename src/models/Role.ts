import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User";

@Entity('roles')
export class Role extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ length: 50, unique: true })
    name!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at!: Date;
    
    @OneToMany(() => User, user => user.role)
    users!: User[];
}
