import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { AuthType } from '../auth/dto/auth.type';
import { CurrentUser } from 'src/auth/currentUser.decorator';


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
  getUserById(@CurrentUser() user: User)  {
    return user;
  }
  
  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  updateUser(
    @CurrentUser() user: User,
    @Args('data') data: UpdateUserInput
  ) {
    return this.usersService.update(user, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  removeUser(@CurrentUser() user: User) {
    return this.usersService.remove(user);
  }
}
