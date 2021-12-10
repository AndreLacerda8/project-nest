import { ObjectType, Field } from '@nestjs/graphql';
import { Bet } from '../../bets/entities/bet.entity';
import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@ObjectType()
@Entity('games')
export class Game {
    @Field(() => Number)
    @PrimaryColumn()
    @Generated('increment')
    id: number

    @Field(() => String)
    @Column()
    type: string

    @Field(() => String)
    @Column()
    description: string

    @Field(() => Number)
    @Column()
    range: number

    @Field(() => Number)
    @Column({ type: 'float' })
    price: number

    @Field(() => Number)
    @Column()
    max_number: number

    @Field(() => String)
    @Column()
    color: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Field(() => [Bet])
    @OneToMany(type => Bet, bet => bet.game_id)
    bets: Bet[]
}