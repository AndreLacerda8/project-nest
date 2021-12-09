import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

@InputType()
export class UpdateBetInput {
  @IsNumber()
  @Field()
  game_id?: number

  @IsString()
  @Field()
  numbers?: string
}
