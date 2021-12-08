import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt'
import { User } from 'src/users/entities/user.entity';
import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(data: AuthInput): Promise<AuthType> {
    const user = await this.usersService.findByEmail(data.email);
    if(!user){
      throw new NotFoundException("User Not Found")
    }
    const correctPassword = await compare(data.password, user.password)
    if (!correctPassword){
      throw new NotFoundException("User Not Found")
    }

    const token = await this.jwtToken(user)

    return {
      user,
      token
    }
  }

  async jwtToken(user: User){
    const payload = { email: user.email, sub: user.id }
    return this.jwtService.signAsync(payload)
  }
}