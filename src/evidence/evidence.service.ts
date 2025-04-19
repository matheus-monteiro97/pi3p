import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateEvidenceDto } from './dto/evidence.createDto';
import { UpdateEvidenceDto } from './dto/evidence.updateDto';
import { Status, Role } from '@prisma/client';

@Injectable()
export class EvidenceService {
  constructor(private readonly prisma: PrismaService) {}

  private async validateRole(caseId: string, userId: string, role: Role) {
    if (role === 'ADMIN' || role === 'PERITO') return;

    const caseGet = await this.prisma.case.findUnique({
      where: { id: caseId },
    });

    if (!caseGet) throw new NotFoundException('Caso informado não existe');
    if (caseGet.managerId !== userId) {
      throw new ForbiddenException('Acesso negado a este caso');
    }
  }

  async create(dto: CreateEvidenceDto, userId: string, role: Role) {
    await this.validateRole(dto.caseId, userId, role);

    try {
      const evidence = await this.prisma.evidence.create({
        data: {
          type: dto.type,
          dateCollection: new Date(dto.dateCollection),
          status: Status.ATIVADO,
          collectedById: userId,
          caseId: dto.caseId,
        },
      });

      if (dto.type === 'IMAGE') {
        if (!dto.imageURL) {
          throw new InternalServerErrorException('URL da imagem é obrigatória para evidência do tipo IMAGE');
        }

        await this.prisma.imageEvidence.create({
          data: {
            imageURL: dto.imageURL,
            evidence: { connect: { id: evidence.id } },
          },
        });
      }

      if (dto.type === 'TEXT') {
        if (!dto.content) {
          throw new InternalServerErrorException('Conteúdo de texto é obrigatório para evidência do tipo TEXT');
        }

        await this.prisma.textEvidence.create({
          data: {
            content: dto.content,
            evidence: { connect: { id: evidence.id } },
          },
        });
      }

      return evidence;
    } catch (error) {
      console.error('Erro ao criar evidência completa:', error);
      throw new InternalServerErrorException('Erro ao criar evidência');
    }
  }

  async update(id: string, dto: UpdateEvidenceDto, userId: string, role: Role) {
    const existing = await this.prisma.evidence.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Evidência não encontrada');

    await this.validateRole(existing.caseId, userId, role);

    try {
      const evidence = await this.prisma.evidence.update({
        where: { id },
        data: {
          type: dto.type,
          dateCollection: dto.dateCollection ? new Date(dto.dateCollection) : undefined,
        },
      });

      if (existing.type === 'IMAGE') {
        if (dto.content !== undefined) {
          throw new InternalServerErrorException('Não é possível atualizar conteúdo de texto em evidência do tipo IMAGE');
        }

        if (dto.imageURL !== undefined) {
          const exists = await this.prisma.imageEvidence.findUnique({ where: { id } });
          if (exists) {
            await this.prisma.imageEvidence.update({
              where: { id },
              data: { imageURL: dto.imageURL },
            });
          } else {
            await this.prisma.imageEvidence.create({
              data: {
                id,
                imageURL: dto.imageURL,
              },
            });
          }
        }
      }

      if (existing.type === 'TEXT') {
        if (dto.imageURL !== undefined) {
          throw new InternalServerErrorException('Não é possível atualizar imagem em evidência do tipo TEXT');
        }

        if (dto.content !== undefined) {
          const exists = await this.prisma.textEvidence.findUnique({ where: { id } });
          if (exists) {
            await this.prisma.textEvidence.update({
              where: { id },
              data: { content: dto.content },
            });
          } else {
            await this.prisma.textEvidence.create({
              data: {
                id,
                content: dto.content,
              },
            });
          }
        }
      }

      return evidence;
    } catch (error) {
      console.error('Erro ao atualizar evidência:', error);
      throw new InternalServerErrorException('Erro ao atualizar evidência');
    }
  }

  async delete(id: string, userId: string, role: Role) {
    const existing = await this.prisma.evidence.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Evidência não encontrada');

    await this.validateRole(existing.caseId, userId, role);

    try {
      return await this.prisma.evidence.update({
        where: { id },
        data: { status: Status.DESATIVADO },
      });
    } catch (error) {
      console.error('Erro ao desativar evidência:', error);
      throw new InternalServerErrorException('Erro ao desativar evidência');
    }
  }

  async getAll(userId: string, role: Role) {
    try {
      if (role === 'ADMIN' || role === 'PERITO') {
        return await this.prisma.evidence.findMany({
          where: { status: Status.ATIVADO },
          include: { imageEvidence: true, textEvidence: true },
        });
      }

      return await this.prisma.evidence.findMany({
        where: {
          status: Status.ATIVADO,
          case: { managerId: userId },
        },
        include: { imageEvidence: true, textEvidence: true },
      });
    } catch (error) {
      console.error('Erro ao buscar evidências:', error);
      throw new InternalServerErrorException('Erro ao buscar evidências');
    }
  }

  async getById(id: string, userId: string, role: Role) {
    const evidence = await this.prisma.evidence.findUnique({
      where: { id },
      include: { imageEvidence: true, textEvidence: true },
    });

    if (!evidence) throw new NotFoundException('Evidência não encontrada');
    await this.validateRole(evidence.caseId, userId, role);

    return evidence;
  }
}
