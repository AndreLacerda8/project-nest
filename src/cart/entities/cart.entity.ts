import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@ObjectType()
@Entity('cart')
export class Cart {
    @Field(() => Number)
    @PrimaryColumn()
    @Generated('increment')
    id: number

    @Field(() => String)
    @Column()
    config: string

    @Field(() => String)
    @Column()
    value: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}