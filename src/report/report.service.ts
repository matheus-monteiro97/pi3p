import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateReportDto } from './dto/report.createDto';
import { UpdateReportDto } from './dto/report.updateDto';
import { Role, Status } from '@prisma/client';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateReportDto, userId: string, role: Role) {
    try {
      if (role === Role.ASSISTENTE) {
        const caseData = await this.prisma.case.findUnique({
          where: { id: dto.caseId },
          select: { managerId: true },
        });

        if (!caseData || caseData.managerId !== userId) {
          throw new ForbiddenException('Acesso negado para criar relatório nesse caso');
        }
      }

      return await this.prisma.report.create({
        data: {
          ...dto,
          responsibleExpertId: userId,
        },
      });
    } catch (error) {
      console.error('Erro ao criar relatório:', error);
      throw error instanceof ForbiddenException
        ? error
        : new InternalServerErrorException('Erro ao criar relatório');
    }
  }

  async update(id: string, dto: UpdateReportDto, userId: string, role: Role) {
    try {
      const report = await this.prisma.report.findUnique({
        where: { id },
        include: { case: true },
      });

      if (!report || report.status === Status.DESATIVADO) {
        throw new NotFoundException('Relatório não encontrado');
      }

      if (role === Role.ASSISTENTE && report.case.managerId !== userId) {
        throw new ForbiddenException('Acesso negado para editar esse relatório');
      }

      return await this.prisma.report.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      console.error('Erro ao atualizar relatório:', error);
      throw (error instanceof ForbiddenException || error instanceof NotFoundException)
        ? error
        : new InternalServerErrorException('Erro ao atualizar relatório');
    }
  }

  async delete(id: string, userId: string, role: Role) {
    try {
      const report = await this.prisma.report.findUnique({
        where: { id },
        include: { case: true },
      });

      if (!report || report.status === Status.DESATIVADO) {
        throw new NotFoundException('Relatório não encontrado');
      }

      if (role === Role.ASSISTENTE && report.case.managerId !== userId) {
        throw new ForbiddenException('Acesso negado para deletar esse relatório');
      }

      return await this.prisma.report.update({
        where: { id },
        data: { status: Status.DESATIVADO },
      });
    } catch (error) {
      console.error('Erro ao deletar relatório:', error);
      throw (error instanceof ForbiddenException || error instanceof NotFoundException)
        ? error
        : new InternalServerErrorException('Erro ao deletar relatório');
    }
  }

  async getAll(userId: string, role: Role) {
    try {
      if (role === Role.ASSISTENTE) {
        return await this.prisma.report.findMany({
          where: {
            status: Status.ATIVADO,
            case: {
              managerId: userId,
            },
          },
          include: { case: true, responsibleExpert: true },
        });
      }

      return await this.prisma.report.findMany({
        where: { status: Status.ATIVADO },
        include: { case: true, responsibleExpert: true },
      });
    } catch (error) {
      console.error('Erro ao listar relatórios:', error);
      throw new InternalServerErrorException('Erro ao buscar relatórios');
    }
  }

  async getById(id: string, userId: string, role: Role) {
    try {
      const report = await this.prisma.report.findUnique({
        where: { id },
        include: { case: true, responsibleExpert: true },
      });

      if (!report || report.status === Status.DESATIVADO) {
        throw new NotFoundException('Relatório não encontrado');
      }

      if (role === Role.ASSISTENTE && report.case.managerId !== userId) {
        throw new ForbiddenException('Acesso negado');
      }

      return report;
    } catch (error) {
      console.error('Erro ao buscar relatório por ID:', error);
      throw (error instanceof ForbiddenException || error instanceof NotFoundException)
        ? error
        : new InternalServerErrorException('Erro ao buscar relatório');
    }
  }
}