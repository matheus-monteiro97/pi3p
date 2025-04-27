import {
    Injectable,
    UnauthorizedException,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import * as bcrypt from 'bcrypt';
  import * as jwt from 'jsonwebtoken';
  import { PrismaService } from 'src/prisma.service';
  import { JwtPayload } from './jwt.payloadInterface';
  import { ResetPasswordDto } from './dto/recovery.password';
  import { ForgotPasswordDto } from './dto/forgot.passwordDto';
  import { MailerService } from '@nestjs-modules/mailer/dist/mailer.service';
  
  @Injectable()
  export class AuthService {
    constructor(private prisma: PrismaService, private mailerService: MailerService) {}
    
    async login(email: string, senha: string) {
      try {
        const user = await this.prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            password: true,
            name: true,
            role: true
          },
        });
  
        if (!user) {
          throw new UnauthorizedException('Usuário ou senha inválidos');
        }
  
        const isPasswordValid = await bcrypt.compare(senha, user.password);
        if (!isPasswordValid) {
          throw new UnauthorizedException('Usuário ou senha inválidos');
        }
  
        const payload: JwtPayload = { email: user.email, userId: user.id, name: user.name, role: user.role };
  
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

    async forgotPassword(dto: ForgotPasswordDto) {
      const { email } = dto;
  
      const user = await this.prisma.user.findUnique({ where: { email } });
  
      if (!user) {
        throw new NotFoundException('Usuário com este e-mail não foi encontrado');
      }
  
      const payload = { sub: user.id, email: user.email };
  
      const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '15m',
      });
  
      const resetLink = `https://seu-front.com/reset-password?token=${token}`;
  
      await this.mailerService.sendMail({
        to: email,
        subject: 'Recuperação de Senha',
        template: './reset-password',
        context: {
          name: user.email,
          url: resetLink,
        },
      });
  
      return { message: 'E-mail de recuperação enviado com sucesso' };
    }
    
    async resetPassword(dto: ResetPasswordDto) {
      const { token, newPassword } = dto;
      let payload: any;
    
      try {
        payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      } catch (err) {
        throw new UnauthorizedException('Token inválido ou expirado');
      }
    
      const userId = payload.sub;
    
      const hashedPassword = await bcrypt.hash(newPassword, 10);
    
      await this.prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });
    
      return { message: 'Senha atualizada com sucesso' };
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
  