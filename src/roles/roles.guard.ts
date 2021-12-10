import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context)
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = ctx.getContext().req;
    const token = request.rawHeaders.filter(i => i.includes('Bearer'))[0]
    const decoded = this.jwtService.decode(token.split('Bearer ').join(''))
    //@ts-ignore
    return requiredRoles.some((role) => decoded.permissions.indexOf(role) !== -1);
  }
}