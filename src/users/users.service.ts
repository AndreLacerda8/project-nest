import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

import { hash } from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ){}

  async create(createUserInput: CreateUserInput) {
    const password = await hash(createUserInput.password, 10)
    createUserInput.password = password
    const user = this.usersRepository.create(createUserInput);
    await this.usersRepository.save(user)
    return user
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne(id);
    return user
  }

  async update(id: string, data: UpdateUserInput) {
    const user = await this.usersRepository.findOne(id)
    await this.usersRepository.update(id, {...data})
    const userUpdated = this.usersRepository.create({...user, ...data})
    return userUpdated
  }

  async remove(id: string) {
    const deleted = await this.usersRepository.delete(id)
    if(deleted){
      return true
    }
    return false
  }
}
