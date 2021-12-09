import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { Bet } from 'src/bets/entities/bet.entity';
import { UsersPermission } from 'src/users-permissions/entities/userspermission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Bet, UsersPermission]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET_KEY_JWT,
        signOptions: {
          expiresIn: '1d'
        }
      })
    }),
  ],
  providers: [AuthService, UsersService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
