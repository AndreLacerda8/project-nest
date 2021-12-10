import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UsersPermission } from './entities/userspermission.entity';

@Injectable()
export class UsersPermissionsService {
    constructor(
        @InjectRepository(UsersPermission)
        private usersPermissionRepository: Repository<UsersPermission>,
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ){}

    async create(id: string){
        try{
            const user = await this.usersRepository.findOne(id)
            if(!user){
                throw new NotFoundException('User not found')
            }
            const usersPermission = this.usersPermissionRepository.create({
                permission_id: 1,
                user_id: id
            })
            await this.usersPermissionRepository.save(usersPermission)
            return 'User is now Admin'
        } catch(err){
            throw new InternalServerErrorException(err)
        }
    }
}
