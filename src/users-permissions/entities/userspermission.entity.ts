import { ObjectType, Field } from '@nestjs/graphql';
import { Permission } from 'src/permissions/entities/permission.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@ObjectType()
@Entity('users_permissions')
export class UsersPermission {
    @Field(() => Number)
    @PrimaryColumn()
    @Generated('increment')
    id: number

    @Field(() => String)
    @Column()
    user_id: string

    @Field(() => Number)
    @Column()
    permission_id: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Field(() => User)
    @ManyToOne(type => User, user => user.userPermission)
    @JoinColumn({ name: 'user_id' })
    user: User

    @Field(() => Permission)
    @ManyToOne(type => Permission, permission => permission.userPermission)
    @JoinColumn({ name: 'permission_id' })
    permission: Permission
}