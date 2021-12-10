import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GamesModule } from './games/games.module';
import { BetsModule } from './bets/bets.module';
import { PermissionsModule } from './permissions/permissions.module';
import { UsersPermissionsModule } from './users-permissions/users-permissions.module';
import { CartModule } from './cart/cart.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
import { RolesModule } from './roles/roles.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ ...req })
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET_KEY_JWT,
        signOptions: {
          expiresIn: '1d'
        }
      })
    }),
    UsersModule,
    AuthModule,
    GamesModule,
    BetsModule,
    PermissionsModule,
    UsersPermissionsModule,
    CartModule,
    RolesModule
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule {
  constructor(private connection: Connection){}
}
