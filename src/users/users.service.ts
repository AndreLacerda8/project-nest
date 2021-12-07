import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ){}

  async create(createUserInput: CreateUserInput) {
    const user = this.usersRepository.create(createUserInput);
    await this.usersRepository.save(user)
    return user
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne(id);
    return user
  }

  async update(id: number, data: UpdateUserInput) {
    const user = await this.usersRepository.findOne(id)
    await this.usersRepository.update(user, {...data})
    const userUpdated = this.usersRepository.create({...user, ...data})
    return userUpdated
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne(id);
    const deleted = await this.usersRepository.delete(user)
    if(deleted){
      return true
    }
    return false
  }
}
