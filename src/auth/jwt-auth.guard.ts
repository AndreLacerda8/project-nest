import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    if(ctx.getArgs().userId){
      const jwtService = new JwtService({
        secret: process.env.SECRET_KEY_JWT,
      })
      const request = ctx.getContext().req;
      const token = request.rawHeaders.filter(i => i.includes('Bearer'))[0]
      const decoded = jwtService.decode(token.split('Bearer ').join(''))
      if(ctx.getArgs().userId !== decoded.sub){
        throw new UnauthorizedException('Invalid ID or token')
      }
    }
    return ctx.getContext().req;
  }
}