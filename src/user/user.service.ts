import {
    Injectable,
    NotFoundException,
    ConflictException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { PrismaService } from 'src/prisma.service';
  import { CreateUserDto } from './dto/user.dto';
  import { UpdateUserDto } from './dto/user.updateDto';
  import * as bcrypt from 'bcrypt';
  import { randomUUID } from 'crypto';
  
  @Injectable()
  export class UserService {
    constructor(private readonly prisma: PrismaService) {}
  
    async create(dto: CreateUserDto) {
      try {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const id = randomUUID();
  
        const user = await this.prisma.user.create({
          data: {
            id,
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
            role: dto.role,
          },
        });
  
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      } catch (error) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email já cadastrado');
        }
        console.error('Erro ao criar usuário:', error);
        throw new InternalServerErrorException('Erro ao criar usuário');
      }
    }
  
    async update(id: string, dto: UpdateUserDto) {
      try {
        if (dto.password) {
          dto.password = await bcrypt.hash(dto.password, 10);
        }
  
        const user = await this.prisma.user.update({
          where: { id },
          data: dto,
        });
  
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      } catch (error) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Usuário não encontrado');
        }
        console.error('Erro ao atualizar usuário:', error);
        throw new InternalServerErrorException('Erro ao atualizar usuário');
      }
    }
  
    async getAll() {
      try {
        const users = await this.prisma.user.findMany({
            where: { status: 'ATIVADO' },
          });
        return users.map(({ password, ...user }) => user);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        throw new InternalServerErrorException('Erro ao buscar usuários');
      }
    }
  
    async getById(id: string) {
      try {
        const user = await this.prisma.user.findUnique({ where: { id } });
  
        if (!user) {
          throw new NotFoundException('Usuário não encontrado');
        }
  
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw error;
        }
        console.error('Erro ao buscar usuário por ID:', error);
        throw new InternalServerErrorException('Erro ao buscar usuário');
      }
    }

    async delete(id: string) {
        try {
          const user = await this.prisma.user.update({
            where: { id },
            data: { status: 'DESATIVADO' },
          });
      
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        } catch (error) {
          if (error.code === 'P2025') {
            throw new NotFoundException('Usuário não encontrado');
          }
          console.error('Erro ao desativar usuário:', error);
          throw new InternalServerErrorException('Erro ao desativar usuário');
        }
      }
      
  }
  