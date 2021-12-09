import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { BetsService } from './bets.service';
import { CreateBetInput } from './dto/create-bet.input';
import { Bet } from './entities/bet.entity';

@Resolver()
export class BetsResolver {
    constructor(
        private betsService: BetsService
    ){}

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Bet)
    createBet(@Args('bet') bet: CreateBetInput){
        return this.betsService.create(bet)
    }
}
