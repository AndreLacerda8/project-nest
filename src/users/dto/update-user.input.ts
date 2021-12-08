import { CreateUserInput } from './create-user.input';
import { InputType, PartialType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator'

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  name?: string;

  @IsEmail()
  email?: string;

  password?: string
}
