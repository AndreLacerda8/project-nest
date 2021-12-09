import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersPermission } from './entities/userspermission.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersPermission]),
    ],
    exports: [TypeOrmModule]
})
export class UsersPermissionsModule {}
