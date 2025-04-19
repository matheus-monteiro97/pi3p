import {
    Injectable,
    UnauthorizedException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import * as bcrypt from 'bcrypt';
  import * as jwt from 'jsonwebtoken';
  import { PrismaService } from 'src/prisma.service';
  import { JwtPayload } from './jwt.payloadInterface';
  
  @Injectable()
  export class AuthService {
    constructor(private prisma: PrismaService) {}
  
    async login(email: string, senha: string) {
      try {
        const user = await this.prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            password: true,
          },
        });
  
        if (!user) {
          throw new UnauthorizedException('Usuário ou senha inválidos');
        }
  
        const isPasswordValid = await bcrypt.compare(senha, user.password);
        if (!isPasswordValid) {
          throw new UnauthorizedException('Usuário ou senha inválidos');
        }
  
        const payload: JwtPayload = { email: user.email, userId: user.id };
  
        const accessToken = this.generateAccessToken(payload);
        const refreshToken = this.generateRefreshToken(payload);
  
        return {
          accessToken,
          refreshToken,
        };
      } catch (error) {
        if (error instanceof UnauthorizedException) {
          throw error;
        }
        console.error('Erro no login:', error);
        throw new InternalServerErrorException('Erro ao tentar fazer login');
      }
    }
  
    private generateAccessToken(payload: JwtPayload): string {
      return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '1h',
      });
    }
  
    private generateRefreshToken(payload: JwtPayload): string {
      return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '7d',
      });
    }
  }
  