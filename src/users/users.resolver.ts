import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { AuthType } from '../auth/dto/auth.type';


@Resolver(() => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @Mutation(() => AuthType)
  async createUser(@Args('data') data: CreateUserInput) {
    const user = await this.usersService.create(data);
    const response = await this.authService.validateUser({ email: data.email, password: data.password })
    return {
      user,
      token: response.token
    }
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  findById(@Args('userId', { type: () => String }) id: string)  {
    return this.usersService.getUserById(id);
  }
  
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  updateUser(
    @Args('userId') id: string,
    @Args('data') data: UpdateUserInput
  ) {
    return this.usersService.update(id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  removeUser(@Args('userId', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }
}
