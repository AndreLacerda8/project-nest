import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { GamesResolver } from './games.resolver';
import { GamesService } from './games.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
  ],
  providers: [GamesResolver, GamesService]
})
export class GamesModule {}
