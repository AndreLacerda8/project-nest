import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersPermission } from './entities/userspermission.entity';
import { UsersPermissionsResolver } from './users-permissions.resolver';
import { UsersPermissionsService } from './users-permissions.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersPermission, User]),
    ],
    exports: [TypeOrmModule],
    providers: [UsersPermissionsResolver, UsersPermissionsService]
})
export class UsersPermissionsModule {}
