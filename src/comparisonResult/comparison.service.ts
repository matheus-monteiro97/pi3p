import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateComparisonResultDto } from './dto/comparison.createDto';
import { UpdateComparisonResultDto } from './dto/comparison.updateDto';
import { Role, Status } from '@prisma/client';

@Injectable()
export class ComparisonResultService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateComparisonResultDto, userId: string, role: Role) {
    try {
      if (role === Role.ASSISTENTE) {
        const evidence = await this.prisma.evidence.findUnique({
          where: { id: dto.evidenceId },
        });

        if (!evidence || evidence.collectedById !== userId) {
          throw new ForbiddenException(
            'Você não tem permissão para criar esse resultado',
          );
        }
      }

      return await this.prisma.comparisonResult.create({
        data: {
          ...dto,
          analyzedById: userId,
        },
      });
    } catch (error) {
      console.error('Erro ao criar resultado:', error);
      throw error instanceof ForbiddenException
        ? error
        : new InternalServerErrorException('Erro ao criar resultado');
    }
  }

  async update(
    id: string,
    dto: UpdateComparisonResultDto,
    userId: string,
    role: Role,
  ) {
    try {
      const result = await this.prisma.comparisonResult.findUnique({
        where: { id },
        include: {
          evidence: true,
        },
      });

      if (!result) {
        throw new NotFoundException('Resultado não encontrado');
      }

      const collectedById = result.evidence.collectedById;

      const isAdminOrPerito = role === Role.ADMIN || role === Role.PERITO;
      const isAllowedAssistant =
        role === Role.ASSISTENTE && collectedById === userId;

      if (!isAdminOrPerito && !isAllowedAssistant) {
        throw new ForbiddenException(
          'Você não tem permissão para editar esse resultado',
        );
      }

      return await this.prisma.comparisonResult.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      console.error('Erro ao atualizar resultado:', error);
      throw (error instanceof ForbiddenException || error instanceof NotFoundException)
        ? error
        : new InternalServerErrorException('Erro ao atualizar resultado');
    }
  }

  async findAll(userId: string, role: Role) {
    try {
      if (role === Role.ADMIN || role === Role.PERITO) {
        return await this.prisma.comparisonResult.findMany({
          where: {
            status: Status.ATIVADO,
          },
          include: {
            evidence: true,
            analyzedBy: true,
          },
        });
      }

      return await this.prisma.comparisonResult.findMany({
        where: {
          status: Status.ATIVADO,
          evidence: {
            collectedById: userId,
          },
        },
        include: {
          evidence: true,
          analyzedBy: true,
        },
      });
    } catch (error) {
      console.error('Erro ao buscar resultados:', error);
      throw new InternalServerErrorException('Erro ao buscar resultados');
    }
  }

  async findOne(id: string, userId: string, role: Role) {
    try {
      const result = await this.prisma.comparisonResult.findUnique({
        where: { id },
        include: {
          evidence: true,
          analyzedBy: true,
        },
      });

      if (!result || result.status === Status.DESATIVADO) {
        throw new NotFoundException('Resultado não encontrado');
      }

      if (
        role === Role.ASSISTENTE &&
        result.evidence.collectedById !== userId
      ) {
        throw new UnauthorizedException(
          'Você não tem permissão para acessar este resultado'
        );
      }

      return result;
    } catch (error) {
      console.error('Erro ao buscar resultado por ID:', error);
      throw (
        error instanceof NotFoundException || error instanceof UnauthorizedException
          ? error
          : new InternalServerErrorException('Erro ao buscar resultado')
      );
    }
  }

  async remove(id: string, userId: string, role: Role) {
    try {
      const result = await this.prisma.comparisonResult.findUnique({
        where: { id },
        include: {
          evidence: true,
        },
      });

      if (!result) {
        throw new NotFoundException('Resultado não encontrado');
      }

      const collectedById = result.evidence.collectedById;

      const isAdminOrPerito = role === Role.ADMIN || role === Role.PERITO;
      const isAllowedAssistant =
        role === Role.ASSISTENTE && collectedById === userId;

      if (!isAdminOrPerito && !isAllowedAssistant) {
        throw new ForbiddenException(
          'Você não tem permissão para desativar esse resultado',
        );
      }

      return await this.prisma.comparisonResult.update({
        where: { id },
        data: { status: Status.DESATIVADO },
      });
    } catch (error) {
      console.error('Erro ao desativar resultado:', error);
      throw (
        error instanceof ForbiddenException || error instanceof NotFoundException
          ? error
          : new InternalServerErrorException('Erro ao desativar resultado')
      );
    }
  }
}