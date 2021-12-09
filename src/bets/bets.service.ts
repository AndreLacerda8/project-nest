import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBetInput } from './dto/create-bet.input';
import { Bet } from './entities/bet.entity';

@Injectable()
export class BetsService {
    constructor(
        @InjectRepository(Bet)
        private betsRepository: Repository<Bet>
    ){}

    async create(bet: CreateBetInput){
        try{
            const newBet =  this.betsRepository.create(bet)
            await this.betsRepository.save(newBet)
            return newBet
        } catch(err){
            throw new InternalServerErrorException(err)
        }
    }
}
