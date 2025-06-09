import { Classification, Status, StatusCase } from '@prisma/client';
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCaseDto {
  @ApiProperty({
    example: 'Caso de análise de perícia odontológica',
    description: 'Título do caso',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Descrição detalhada do caso para avaliação pericial',
    description: 'Descrição do caso',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: Classification.ACIDENTE,
    enum: Classification,
    description: 'Classificação do caso',
  })
  @IsEnum(Classification)
  classification: Classification;

  @ApiPropertyOptional({
    example: StatusCase.ANDAMENTO,
    enum: StatusCase,
    description: 'Status atual do caso (ANDAMENTO, FINALIZADO, ARQUIVADO)',
  })
  @IsOptional()
  @IsEnum(StatusCase, { message: 'O status do caso deve ser ANDAMENTO, FINALIZADO ou ARQUIVADO.' })
  statusCase?: StatusCase;

  @ApiPropertyOptional({
    example: 'd1b5ae91-66c6-4eb3-802b-24de70b4c5a0',
    description: 'ID do gerente responsável pelo caso',
  })
  @IsOptional()
  @IsString()
  managerId?: string;

  @ApiPropertyOptional({
    example: Status.ATIVADO,
    enum: Status,
    description: 'Status do registro (ativo ou desativado)',
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}