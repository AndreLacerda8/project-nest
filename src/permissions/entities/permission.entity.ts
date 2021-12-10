import { ObjectType, Field } from '@nestjs/graphql';
import { UsersPermission } from '../../users-permissions/entities/userspermission.entity';
import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@ObjectType()
@Entity('permissions')
export class Permission {
    @Field(() => Number)
    @PrimaryColumn()
    @Generated('increment')
    id: number

    @Field(() => String)
    @Column()
    name: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Field(() => [UsersPermission])
    @OneToMany(type => UsersPermission, userPermission => userPermission.permission_id)
    userPermission: UsersPermission[]
}