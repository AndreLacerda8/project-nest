import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Bet } from 'src/bets/entities/bet.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid'

@ObjectType()
@Entity('users')
export class User {
  @Field(() => String)
  @PrimaryColumn()
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  email: string;

  @HideField()
  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Field(() => [Bet])
  @OneToMany(type => Bet, bet => bet)
  bets: Bet[]

  constructor(){
    if(!this.id){
      this.id = uuid()
    }
  }
}
