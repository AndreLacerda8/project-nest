import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RolesGuard } from './roles.guard';

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.SECRET_KEY_JWT
            })
        })
    ],
    providers: [RolesGuard]
})
export class RolesModule {}
