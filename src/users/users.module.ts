import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET_KEY_JWT,
        signOptions: {
          expiresIn: '1d'
        }
      })
    })
  ],
  exports: [TypeOrmModule, UsersService],
  providers: [UsersResolver, UsersService, AuthService]
})
export class UsersModule {}
