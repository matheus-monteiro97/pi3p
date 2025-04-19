import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
    ForbiddenException,
  } from '@nestjs/common';
  import { PrismaService } from 'src/prisma.service';
  import { CreateCaseDto } from './dto/case.createDto';
  import { UpdateCaseDto } from './dto/case.updateDto';
  import { Status, Role } from '@prisma/client';
  import { randomUUID } from 'crypto';
  
  @Injectable()
  export class CaseService {
    constructor(private readonly prisma: PrismaService) {}
  
    async create(dto: CreateCaseDto, userId: string) {
      try {
        const id = randomUUID();
        const managerId = dto.managerId || userId;
    
        return await this.prisma.case.create({
          data: {
            id,
            title: dto.title,
            description: dto.description,
            classification: dto.classification,
            managerId,
            statusCase: dto.statusCase,
            status: Status.ATIVADO,
            dataFinished: dto.statusCase === 'FINALIZADO' ? new Date() : null,
          },
        });
      } catch (error) {
        console.error('Erro ao criar caso:', error);
        throw new InternalServerErrorException('Erro ao criar caso');
      }
    }
    
    async update(id: string, dto: UpdateCaseDto, user: { id: string; role: Role }) {
      try {
        const caso = await this.prisma.case.findUnique({ where: { id } });
        if (!caso) throw new NotFoundException('Caso não encontrado');
    
        const isAdminOrPerito = user.role === Role.ADMIN || user.role === Role.PERITO;
        const isManeger = user.id === caso.managerId;
    
        if (!isAdminOrPerito && !isManeger) {
          throw new ForbiddenException('Você não tem permissão para editar este caso');
        }
    
        const isFinishing = dto.statusCase === 'FINALIZADO' && caso.statusCase !== 'FINALIZADO';
    
        return await this.prisma.case.update({
          where: { id },
          data: {
            title: dto.title,
            description: dto.description,
            statusCase: dto.statusCase,
            dataFinished: isFinishing ? new Date() : caso.dataFinished,
          },
        });
      } catch (error) {
        if (error instanceof ForbiddenException || error instanceof NotFoundException) throw error;
        console.error('Erro ao atualizar caso:', error);
        throw new InternalServerErrorException('Erro ao atualizar caso');
      }
    }
    
  
    async delete(id: string, user: { id: string; role: Role }) {
      try {
        const caso = await this.prisma.case.findUnique({ where: { id } });
        if (!caso) throw new NotFoundException('Caso não encontrado');
  
        const isAdminOrPerito = user.role === Role.ADMIN || user.role === Role.PERITO;
        if (!isAdminOrPerito) {
          throw new ForbiddenException('Você não tem permissão para excluir este caso');
        }
  
        return await this.prisma.case.update({
          where: { id },
          data: { status: Status.DESATIVADO },
        });
      } catch (error) {
        if (error instanceof ForbiddenException || error instanceof NotFoundException) throw error;
        console.error('Erro ao desativar caso:', error);
        throw new InternalServerErrorException('Erro ao desativar caso');
      }
    }
  
    async getAll(
        user: { id: string; role: Role },
        filters: {
          startOpeningDate?: string;
          endOpeningDate?: string;
          statusCase?: string;
          managerId?: string;
        },
      ) {
        try {
          const where: any = {
            status: Status.ATIVADO,
          };
      
          if (user.role === Role.ASSISTENTE) {
            where.managerId = user.id;
          } else if (filters.managerId) {
            where.managerId = filters.managerId;
          }
      
          if (filters.statusCase) {
            where.statusCase = filters.statusCase;
          }
      
          if (filters.startOpeningDate || filters.endOpeningDate) {
            where.OpeningDate = {};
            if (filters.startOpeningDate) {
              where.OpeningDate.gte = new Date(filters.startOpeningDate);
            }
            if (filters.endOpeningDate) {
              where.OpeningDate.lte = new Date(filters.endOpeningDate);
            }
          }
      
          return await this.prisma.case.findMany({ where });
        } catch (error) {
          console.error('Erro ao listar casos com filtros:', error);
          throw new InternalServerErrorException('Erro ao listar casos');
        }
      }
      
    async getById(id: string, user: { id: string; role: Role }) {
      try {
        const caseGet = await this.prisma.case.findUnique({ where: { id } });
        if (!caseGet) throw new NotFoundException('Caso não encontrado');
  
        if (user.role === Role.ASSISTENTE && caseGet.managerId !== user.id) {
          throw new ForbiddenException('Você não tem permissão para acessar este caso');
        }
  
        return caseGet;
      } catch (error) {
        if (error instanceof ForbiddenException || error instanceof NotFoundException) throw error;
        console.error('Erro ao buscar caso:', error);
        throw new InternalServerErrorException('Erro ao buscar caso');
      }
    }
  }
  