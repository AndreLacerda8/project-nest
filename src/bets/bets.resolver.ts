import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { BetsService } from './bets.service';
import { CreateBetInput } from './dto/create-bet.input';
import { UpdateBetInput } from './dto/update-bet.input';
import { Bet } from './entities/bet.entity';

@Resolver()
export class BetsResolver {
    constructor(
        private betsService: BetsService
    ){}

    @UseGuards(GqlAuthGuard)
    @Query(() => [Bet], { name: 'bets' })
    getBetsUser(@Args('userId') userId: string){
        return this.betsService.getBetsOfUser(userId)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Bet, { name: 'bet' })
    getBet(@Args('betId') betId: number){
        return this.betsService.getBet(betId)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => [Bet])
    createBet(@Args('bets', { type: () => [CreateBetInput] }) bets: CreateBetInput[]){
        return this.betsService.create(bets)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Bet)
    updateBet(
        @Args('betId') betId: number,
        @Args('userId') userId: string,
        @Args('bet') bet: UpdateBetInput
    ){
        return this.betsService.update(betId, userId, bet)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    deleteBet(
        @Args('betId') betId: number,
        @Args('userId') userId: string
    ){
        return this.betsService.delete(betId, userId)
    }
}
