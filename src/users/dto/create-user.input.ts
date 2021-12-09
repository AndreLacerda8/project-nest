import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string

  @IsEmail()
  @IsNotEmpty()
  @Field(() => String)
  email: string

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  password: string
}
