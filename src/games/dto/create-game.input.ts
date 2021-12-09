import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

@InputType()
export class CreateGameInput {
  @IsNotEmpty()
  @IsString()
  @Field()
  type: string

  @IsString()
  @IsNotEmpty()
  @Field()
  description: string

  @IsNotEmpty()
  @IsNumber()
  @Field()
  range: number

  @IsNotEmpty()
  @IsNumber()
  @Field()
  price: number

  @IsNotEmpty()
  @IsNumber()
  @Field()
  max_number: number

  @IsNotEmpty()
  @IsString()
  @Field()
  color: string
}
