import { ObjectType, Field } from '@nestjs/graphql';
import { Game } from 'src/games/entities/game.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, Generated, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@ObjectType()
@Entity('bets')
export class Bet {
    @Field(() => Number)
    @PrimaryColumn()
    @Generated('increment')
    id: number

    @Field(() => String)
    @Column()
    user_id: string

    @Field(() => Number)
    @Column()
    game_id: number

    @Field(() => String)
    @Column()
    numbers: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Field(() => User)
    @ManyToOne(type => User, user => user.bets)
    bets: Bet
}