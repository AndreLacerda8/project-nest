import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
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
    getBetsUser(@CurrentUser() user: User){
        return this.betsService.getBetsOfUser(user)
    }

    @UseGuards(GqlAuthGuard)
    @Query(() => Bet, { name: 'bet' })
    getBet(@Args('betId') betId: number, @CurrentUser() user: User){
        return this.betsService.getBet(betId, user)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => [Bet])
    createBet(
        @Args('bets', { type: () => [CreateBetInput] }) bets: CreateBetInput[],
        @CurrentUser() user: User
    ){
        return this.betsService.create(bets, user)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Bet)
    updateBet(
        @Args('betId') betId: number,
        @CurrentUser() user: User,
        @Args('bet') bet: UpdateBetInput
    ){
        return this.betsService.update(betId, user, bet)
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Boolean)
    deleteBet(
        @Args('betId') betId: number,
        @CurrentUser() user: User
    ){
        return this.betsService.delete(betId, user)
    }
}
