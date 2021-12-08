import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt'
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const correctPassword = await compare(pass, user.password)
    if (user && correctPassword) {
      const { name, email, id } = user;
      return {
        id, name, email
      };
    }
    return null;
  }

  async login(user: User){
    const payload = { email: user.email, sub: user.id }
    return {
        access_token: this.jwtService.sign(payload)
    }
  }
}