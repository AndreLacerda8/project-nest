import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBetInput } from './dto/create-bet.input';
import { UpdateBetInput } from './dto/update-bet.input';
import { Bet } from './entities/bet.entity';

@Injectable()
export class BetsService {
    constructor(
        @InjectRepository(Bet)
        private betsRepository: Repository<Bet>
    ){}

    async getBetsOfUser(userId: string){
        try{
            const bets = await this.betsRepository.find({
                where: { user_id: userId },
                relations: ['game']
            })
            return bets
        } catch(err){
            throw new InternalServerErrorException(err)
        }
    }

    async getBet(betId: number){
        try{
            const bet = await this.betsRepository.findOne({
                where: { id: betId },
                relations: ['game']
            })
            if(!bet){
                throw new NotFoundException('Bet not found')
            }
            return bet
        } catch(err){
            throw new InternalServerErrorException(err)
        }
    }

    async create(bet: CreateBetInput){
        try{
            const newBet =  this.betsRepository.create(bet)
            await this.betsRepository.save(newBet)
            return newBet
        } catch(err){
            throw new InternalServerErrorException(err)
        }
    }

    async update(betId: number, data: UpdateBetInput){
        try{
            const bet = await this.betsRepository.findOne(betId)
            if(!bet){
                throw new NotFoundException('Bet not Found')
            }
            await this.betsRepository.update(betId, {...data})
            const newBet = this.betsRepository.create({...bet, ...data})
            return newBet
        } catch(err){
            throw new InternalServerErrorException(err)
        }
    }

    async delete(betId: number){
        try{
            const bet = await this.betsRepository.findOne(betId)
            if(!bet){
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
