import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { Game } from './entities/game.entity';
import { GamesResolver } from './games.resolver';
import { GamesService } from './games.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game, Cart]),
  ],
  providers: [GamesResolver, GamesService]
})
export class GamesModule {}
