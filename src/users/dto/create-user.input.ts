import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, } from 'class-validator'

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @Field(() => String)
  name: string

  @IsEmail()
  @IsNotEmpty()
  @Field(() => String)
  email: string

  @IsNotEmpty()
  @Field(() => String)
  password: string
}
