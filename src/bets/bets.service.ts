import { BadRequestException, ExecutionContext, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Context, GqlExecutionContext } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { userInfo } from 'os';
import { Cart } from 'src/cart/entities/cart.entity';
import { Game } from 'src/games/entities/game.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateBetInput } from './dto/create-bet.input';
import { UpdateBetInput } from './dto/update-bet.input';
import { Bet } from './entities/bet.entity';

@Injectable()
export class BetsService {
    constructor(
        @InjectRepository(Bet)
        private betsRepository: Repository<Bet>,
        @InjectRepository(Game)
        private gamesRepository: Repository<Game>,
        @InjectRepository(Cart)
        private cartsRepository: Repository<Cart>
    ){}

    async getBetsOfUser(user: User){
        try{
            const bets = await this.betsRepository.find({
                where: { user_id: user.id },
                relations: ['game']
            })
            return bets
        } catch(err){
            throw new InternalServerErrorException(err)
        }
    }

    async getBet(betId: number, user: User){
        try{
            const bet = await this.betsRepository.findOne({
                where: { id: betId },
                relations: ['game']
            })
            if(!bet || bet.user_id !== user.id){
                throw new NotFoundException('Bet not found')
            }
            return bet
        } catch(err){
            throw new InternalServerErrorException(err)
        }
    }

    async create(bets: CreateBetInput[], user: User){
        try{
            const allGames = await this.gamesRepository.find()
            const prices = allGames.map(game => {
                return { id: game.id, price: game.price }
            })
            const totalPrice = bets.reduce((acc, crr) => {
                const currentPrice = prices.filter(price => {
                    return price.id === +crr.game_id
                })[0].price
                return acc + (+currentPrice)
            }, 0)
            const minCartValue = await this.cartsRepository.findOne({
                where: { config: 'min-cart-value' }
            })
            if(totalPrice < +minCartValue.value){
                throw new BadRequestException('The Minimun value of the cart must be ' + minCartValue.value + ',00')
            }
            const betsFormated = bets.map(bet => {
                return {
                    ...bet,
                    user_id: user.id
                }
            })
            const newBets = this.betsRepository.create(betsFormated)
            await this.betsRepository.save(newBets)
            return newBets
        } catch(err){
            throw new InternalServerErrorException(err)
        }
    }

    async update(betId: number, user: User, data: UpdateBetInput){
        try{
            const bet = await this.betsRepository.findOne(betId)
            if(!bet || bet.user_id !== user.id){
                throw new NotFoundException('Bet not Found')
            }
            await this.betsRepository.update(betId, {...data})
            const newBet = this.betsRepository.create({...bet, ...data})
            return newBet
        } catch(err){
            throw new InternalServerErrorException(err)
        }
    }

    async delete(betId: number, user: User){
        try{
            const bet = await this.betsRepository.findOne(betId)
            if(!bet || bet.user_id !== user.id){
                throw new NotFoundException('Bet not Found')
            }
            const deletedBet = await this.betsRepository.delete(betId)
            if(deletedBet.affected !== 0){
                return true
            }
            return false
        } catch(err){
            throw new InternalServerErrorException(err)
        }
    }
}
