import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetsResolver } from './bets.resolver';
import { BetsService } from './bets.service';
import { Bet } from './entities/bet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bet]),
  ],
  providers: [BetsResolver, BetsService],
  exports: [TypeOrmModule]
})
export class BetsModule {}
