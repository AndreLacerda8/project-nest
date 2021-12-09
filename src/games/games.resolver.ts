import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Game } from './entities/game.entity';
import { GamesService } from './games.service';

@Resolver()
export class GamesResolver {
    constructor(
        private gamesService: GamesService
    ){}

    @UseGuards(GqlAuthGuard)
    @Query(() => [Game], { name: 'games' })
    getAllGames(){
        return this.gamesService.getAllGames()
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Game, { name: 'game' })
    getGameById(@Args('id') id: number){
        return this.gamesService.getGameById(id)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Game)
    createGame(@Args('game') game: CreateGameInput){
        return this.gamesService.create(game)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Game)
    updateGame(
        @Args('id') id: number,
        @Args('game') game: UpdateGameInput
    ){
        return this.gamesService.update(id, game)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    deleteGame(@Args('id') id: number){
        return this.gamesService.delete(id)
    }
}
