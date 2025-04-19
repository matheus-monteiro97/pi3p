import { TypeEvidence } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString, IsDateString, IsEnum } from 'class-validator';

export class CreateEvidenceDto {
  @IsNotEmpty()
  @IsEnum(TypeEvidence)
  type: TypeEvidence;

  @IsNotEmpty()
  @IsDateString()
  dateCollection: string;

  @IsNotEmpty()
  @IsString()
  caseId: string;

  @IsOptional()
  @IsString()
  imageURL?: string;

  @IsOptional()
  @IsString()
  content?: string;
}
