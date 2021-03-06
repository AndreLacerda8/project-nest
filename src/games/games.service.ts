import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { Repository } from 'typeorm';
import { AllGamesType } from './dto/allgames.type';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
    constructor(
        @InjectRepository(Game)
        private gamesRepository: Repository<Game>,
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>
    ){}

    async getAllGames(): Promise<AllGamesType> {
        try{
            const allGames = await this.gamesRepository.find()
            const cart = await this.cartRepository.findOne({
                where: { config: 'min-cart-value' }
            })
            return {
                minCartValue: +cart.value,
                allGames
            }
        } catch(err){
            throw new InternalServerErrorException(err)
        }
    }

    async getGameById(id: number){
        try{
            const game = await this.gamesRepository.findOne(id)
            if(!game){
                throw new NotFoundException('Game not Found')
            }
            return game
        } catch(err){
            throw new InternalServerErrorException(err)
        }
    }

    async create(game: CreateGameInput){
        try{
            const alreadyExists = await this.gamesRepository.findOne({
                where: {type: game.type}
            })
            if(alreadyExists){
                throw new BadRequestException('Game already exists')
            }
            const newGame = this.gamesRepository.create(game)
            await this.gamesRepository.save(newGame)
            return newGame
        } catch(err){
            throw new InternalServerErrorException(err)
        }
    }

    async update(id: number, data: UpdateGameInput){
        try {
            const game = await this.gamesRepository.findOne(id)
            if(!game){
                throw new NotFoundException('Game not Found')
            }
            await this.gamesRepository.update(id, {...data})
            const gameUpdated = this.gamesRepository.create({...game, ...data})
            return gameUpdated
        } catch (err) {
            throw new InternalServerErrorException(err)
        }
    }

    async delete(id: number){
        try{
            const game = await this.gamesRepository.findOne(id)
            if(!game){
                throw new NotFoundException('Game Not Found')
            }
            const deletedGame = await this.gamesRepository.delete(id)
            if(deletedGame.affected !== 0){
                return true
            }
            return false
        } catch(err){
            throw new InternalServerErrorException(err)
        }
    }
}
