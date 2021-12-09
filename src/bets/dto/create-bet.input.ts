import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

@InputType()
export class CreateBetInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  user_id: string

  @IsNumber()
  @IsNotEmpty()
  @Field()
  game_id: number

  @IsNotEmpty()
  @IsString()
  @Field()
  numbers: string
}
