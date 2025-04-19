import { Module } from '@nestjs/common';
import { AuthService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/prisma.service';
import { AuthController } from './auth.controller';

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, PrismaService],
})
export class AuthModule {}
