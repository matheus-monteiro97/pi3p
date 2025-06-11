import {
    ForbiddenException,
    Injectable,
    NotFoundException,
    InternalServerErrorException,
    BadRequestException,
  } from '@nestjs/common';
  import { PrismaService } from 'src/prisma.service';
  import { CreatePatientDto } from './dto/patient.createDto';
  import { UpdatePatientDto } from './dto/patient.updateDto';
  import { Role, Status, User } from '@prisma/client';
  
  @Injectable()
  export class PatientService {
    constructor(private readonly prisma: PrismaService) {}
  
async create(createPatientDto: CreatePatientDto, user: User) {
  try {
    const {
      name,
      sex,
      birthDate,
      caseId,
      identified,
      status,
      anatomicalNotes,
      address,
      document,
      ethnicity,
      odontogramEntries = [],
    } = createPatientDto;

    const caseFound = await this.prisma.case.findUnique({
      where: {
        id: caseId,
        status: 'ATIVADO',
      },
    });

    if (!caseFound) {
      throw new NotFoundException('Caso não encontrado ou desativado.');
    }

    if (
      user.role === Role.ASSISTENTE &&
      caseFound.managerId !== user.id
    ) {
      throw new ForbiddenException(
        'Você só pode vincular pacientes a casos em que é o gerente.',
      );
    }

    if (identified === 'YES' && !birthDate) {
      throw new BadRequestException(
        'Data de nascimento é obrigatória para pacientes identificados.',
      );
    }

    const patientName = identified === 'NO' ? 'Anônimo' : name;
    const patientBirthDate = identified === 'NO' ? null : new Date(birthDate);

    return await this.prisma.patient.create({
      data: {
        name: patientName,
        sex,
        birthDate: patientBirthDate,
        identified,
        status: status ?? Status.ATIVADO,
        anatomicalNotes,
        address,
        document,
        ethnicity,
        case: {
          connect: { id: caseId },
        },
        odontogramEntries: {
          create: odontogramEntries.map((entry) => ({
            toothNumber: entry.toothNumber,
            note: entry.note,
          })),
        },
      },
      include: {
        odontogramEntries: true,
      },
    });
  } catch (error) {
    throw new InternalServerErrorException(
      'Erro ao criar paciente: ' + error.message,
    );
  }
}
  
    async findAll() {
      try {
        return this.prisma.patient.findMany({
          where: { status: Status.ATIVADO },
        });
      } catch (error) {
        throw new InternalServerErrorException('Erro ao listar pacientes');
      }
    }
  
    async findOne(id: string) {
      try {
        const patient = await this.prisma.patient.findUnique({
          where: { id },
          include: {
            odontogramEntries: true,
          },
        });

        if (!patient || patient.status === Status.DESATIVADO) {
          throw new NotFoundException('Paciente não encontrado');
        }
  
        return patient;
      } catch (error) {
        throw new InternalServerErrorException(
          'Erro ao buscar paciente: ' + error.message,
        );
      }
    }
  
  async update(id: string, data: UpdatePatientDto, user: any) {
    try {
      const patient = await this.prisma.patient.findUnique({
        where: { id },
        include: { odontogramEntries: true },
      });

      if (!patient) {
        throw new NotFoundException('Paciente não encontrado');
      }

      const caseFound = await this.prisma.case.findUnique({
        where: { id: patient.caseId },
      });

      if (user.role === Role.ASSISTENTE && caseFound?.managerId !== user.id) {
        throw new ForbiddenException(
          'Assistente só pode editar pacientes de casos que gerencia',
        );
      }

      const updatedName = data.identified === 'NO' ? 'Anônimo' : data.name ?? patient.name;
      const updatedBirthDate =
        data.identified === 'NO' ? null : data.birthDate ?? patient.birthDate;

      const updateData: any = {
        ...data,
        name: updatedName,
        birthDate: updatedBirthDate ? new Date(updatedBirthDate) : null,
      };

      if (data.odontogramEntries) {
        updateData.odontogramEntries = {
          deleteMany: {},
          create: data.odontogramEntries.map((entry) => ({
            toothNumber: entry.toothNumber,
            note: entry.note,
          })),
        };
      }

      return await this.prisma.patient.update({
        where: { id },
        data: updateData,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao atualizar paciente: ' + error.message,
      );
    }
  }

    async remove(id: string, user: any) {
      try {
        const patient = await this.prisma.patient.findUnique({
          where: { id },
        });
  
        if (!patient || patient.status === Status.DESATIVADO) {
          throw new NotFoundException('Paciente não encontrado');
        }
  
        const caseFound = await this.prisma.case.findUnique({
          where: { id: patient.caseId },
        });
  
        if (
          user.role === Role.ASSISTENTE &&
          caseFound?.managerId !== user.id
        ) {
          throw new ForbiddenException(
            'Assistente só pode remover pacientes de casos que gerencia',
          );
        }
  
        return this.prisma.patient.update({
          where: { id },
          data: { status: Status.DESATIVADO },
        });
      } catch (error) {
        throw new InternalServerErrorException(
          'Erro ao remover paciente: ' + error.message,
        );
      }
    }
  }  