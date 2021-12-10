import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Bet } from '../../bets/entities/bet.entity';
import { UsersPermission } from '../../users-permissions/entities/userspermission.entity';
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
  @OneToMany(type => Bet, bet => bet.user_id)
  bets: Bet[]

  @Field(() => [UsersPermission])
  @OneToMany(type => UsersPermission, userPermission => userPermission.user_id)
  userPermission: UsersPermission[]

  constructor(){
    if(!this.id){
      this.id = uuid()
    }
  }
}
