import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty({
    example: 'Relatório de necropsia',
    description: 'Título do relatório',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Paciente apresentava fratura no maxilar...',
    description: 'Conteúdo técnico do relatório',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    example: '23de2e7a-cc73-4c09-9c1f-725fc1ec05a4',
    description: 'ID do caso ao qual o relatório pertence',
  })
  @IsUUID()
  caseId: string;
}