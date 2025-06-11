import {
  IsString,
  IsEnum,
  IsUUID,
  IsOptional,
  ValidateNested,
  IsInt,
} from 'class-validator';
import { Identified, Status } from '@prisma/client';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OdontogramEntryDto } from './odontogramDto';

export class CreatePatientDto {
  @ApiProperty({ example: 'João da Silva', description: 'Nome do paciente' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'M', description: 'Sexo do paciente (M/F)' })
  @IsString()
  sex: string;

  @ApiPropertyOptional({
    example: '2000-01-15',
    description: 'Data de nascimento do paciente (opcional)',
    type: String,
    format: 'date',
  })
  @IsOptional()
  @Type(() => Date)
  birthDate?: Date;

  @ApiProperty({
    example: 'd3ad3f0e-73fb-4fc2-bd4e-0de9a502cc45',
    description: 'ID do caso vinculado ao paciente',
  })
  @IsUUID()
  caseId: string;

  @ApiProperty({
    enum: Identified,
    example: Identified.YES,
    description: 'Status de identificação do paciente',
  })
  @IsEnum(Identified)
  identified: Identified;

  @ApiProperty({
    example: 'Corpo parcialmente carbonizado',
    description: 'Observações anatômicas',
  })
  @IsString()
  anatomicalNotes: string;

  @ApiPropertyOptional({ example: 'Rua Exemplo, 123 - Bairro' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: '12345678900', description: 'Documento (opcional)' })
  @IsOptional()
  @IsString()
  document?: string;

  @ApiPropertyOptional({ example: 'Parda', description: 'Etnia (opcional)' })
  @IsOptional()
  @IsString()
  ethnicity?: string;

  @ApiPropertyOptional({
    enum: Status,
    example: Status.ATIVADO,
    description: 'Status do paciente (ativo ou desativado)',
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiPropertyOptional({
    type: [OdontogramEntryDto],
    description: 'Lista de entradas odontológicas do paciente (dentes + observações)',
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OdontogramEntryDto)
  odontogramEntries?: OdontogramEntryDto[];
}