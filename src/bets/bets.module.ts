import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { Game } from 'src/games/entities/game.entity';
import { BetsResolver } from './bets.resolver';
import { BetsService } from './bets.service';
import { Bet } from './entities/bet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bet, Game, Cart]),
  ],
  providers: [BetsResolver, BetsService],
  exports: [TypeOrmModule]
})
export class BetsModule {}
