import { ObjectType, Field } from '@nestjs/graphql';
import { Game } from '../../games/entities/game.entity';
import { User } from '../../users/entities/user.entity';
import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'

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
    @JoinColumn({ name: 'user_id' })
    user: User

    @Field(() => Game)
    @ManyToOne(type => Game, game => game.bets)
    @JoinColumn({ name: 'game_id' })
    game: Game
}