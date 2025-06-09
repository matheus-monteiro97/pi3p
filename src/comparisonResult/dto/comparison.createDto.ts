import {
  IsUUID,
  IsString,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateComparisonResultDto {
  @ApiProperty({
    example: 'Compatível com a arcada superior do paciente X',
    description: 'Resultado da comparação feita entre evidências',
  })
  @IsString()
  result: string;

  @ApiProperty({
    example: 0.92,
    description: 'Precisão/confiança do resultado (0 a 1)',
    type: Number,
  })
  @IsNumber()
  precision: number;

  @ApiProperty({
    example: '2025-06-01T10:00:00Z',
    description: 'Data da análise',
    type: String,
    format: 'date-time',
  })
  @IsDateString()
  dateAnalysis: string;

  @ApiProperty({
    example: 'd1b5ae91-66c6-4eb3-802b-24de70b4c5a0',
    description: 'ID da evidência relacionada à análise',
  })
  @IsUUID()
  evidenceId: string;
}