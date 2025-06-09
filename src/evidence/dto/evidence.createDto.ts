import { TypeEvidence } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString, IsDateString, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEvidenceDto {
  @ApiProperty({
    enum: TypeEvidence,
    example: TypeEvidence.IMAGE,
    description: 'Tipo da evidência (IMAGE ou TEXT)',
  })
  @IsNotEmpty()
  @IsEnum(TypeEvidence)
  type: TypeEvidence;

  @ApiProperty({
    example: '2024-11-20T14:00:00Z',
    description: 'Data da coleta da evidência',
    type: String,
    format: 'date-time',
  })
  @IsNotEmpty()
  @IsDateString()
  dateCollection: string;

  @ApiProperty({
    example: 'e7f62c56-c7b1-41bb-8a2c-46e7dc73a8b6',
    description: 'ID do caso relacionado à evidência',
  })
  @IsNotEmpty()
  @IsString()
  caseId: string;

  @ApiPropertyOptional({
    example: 'https://meusite.com/imagem.png',
    description: 'URL da imagem da evidência (caso aplicável)',
  })
  @IsOptional()
  @IsString()
  imageURL?: string;

  @ApiPropertyOptional({
    example: 'Descrição técnica da evidência textual',
    description: 'Conteúdo textual da evidência (caso aplicável)',
  })
  @IsOptional()
  @IsString()
  content?: string;
}