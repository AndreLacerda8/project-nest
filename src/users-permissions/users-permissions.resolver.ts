import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { UsersPermissionsService } from './users-permissions.service';

@Resolver()
export class UsersPermissionsResolver {
    constructor(
        private usersPermissionsService: UsersPermissionsService
    ){}

    @UseGuards(GqlAuthGuard)
    @Mutation(() => String)
    @Roles(Role.Admin)
    createAdmin(@Args('id') id: string){
        return this.usersPermissionsService.create(id)
    }
}
