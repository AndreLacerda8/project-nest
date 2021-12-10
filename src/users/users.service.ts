import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

import { hash } from 'bcrypt'
import { Bet } from '../bets/entities/bet.entity';
import { UsersPermission } from '../users-permissions/entities/userspermission.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Bet)
    private betsRepository: Repository<Bet>,
    @InjectRepository(UsersPermission)
    private usersPermissionRepository: Repository<UsersPermission>
  ){}

  async create(data: CreateUserInput) {
    const alreadyExists = await this.usersRepository.findOne({ where: {email: data.email} })
    if(alreadyExists){
      throw new BadRequestException('Email already exists')
    }
    const password = await hash(data.password, 10)
    const user = this.usersRepository.create({
      name: data.name,
      email: data.email,
      password
    });
    await this.usersRepository.save(user)
    const usersPermission = this.usersPermissionRepository.create({
      permission_id: 2,
      user_id: user.id
    })
    await this.usersPermissionRepository.save(usersPermission)
    return user
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: {email},
    },)
    if(!user){
      throw new NotFoundException('User Not Found')
    }
    const bets = await this.betsRepository.find({
      where: {user_id: user.id}
    })
    user.bets = bets
    const userPermissions = await this.usersPermissionRepository.find({
      where: {user_id: user.id},
      relations: ['permission']
    })
    user.userPermission = userPermissions
    return user
  }

  async getUserById(id: string){
    const currentUser = await this.usersRepository.findOne(id)
    if(!currentUser){
      throw new NotFoundException('User Not Found')
    }
    const bets = await this.betsRepository.find({
      where: {user_id: currentUser.id},
      relations: ['game']
    })
    currentUser.bets = bets
    const userPermissions = await this.usersPermissionRepository.find({
      where: {user_id: currentUser.id},
      relations: ['permission']
    })
    currentUser.userPermission = userPermissions
    return currentUser
  }

  async update(user: User, data: UpdateUserInput) {
    const currentUser = await this.usersRepository.findOne(user.id)
    if(!currentUser){
      throw new NotFoundException('User Not Found')
    }
    await this.usersRepository.update(currentUser.id, {...data})
    const userUpdated = this.usersRepository.create({...user, ...data})
    return userUpdated
  }

  async remove(user: User) {
    const currentUser = await this.usersRepository.findOne(user.id)
    if(!user){
      throw new NotFoundException('User Not Found')
    }
    const bets = await this.betsRepository.find({ where: { user_id: user.id } })
    for(let bet of bets){
      await this.betsRepository.delete(bet.id)
    }
    const permissions = await this.usersPermissionRepository.find({ where: { user_id: user.id } })
    for(let permission of permissions){
      await this.usersPermissionRepository.delete(permission.id)
    }
    const deleted = await this.usersRepository.delete(currentUser.id)
    if(deleted.affected !== 0){
      return true
    }
    return false
  }
}
