import { TypeEvidence } from '@prisma/client';
import { IsOptional, IsString, IsDateString, IsEnum } from 'class-validator';

export class UpdateEvidenceDto {
  @IsOptional()
  @IsEnum(TypeEvidence)
  type: TypeEvidence;

  @IsOptional()
  @IsDateString()
  dateCollection: string;

  @IsOptional()
  @IsString()
  imageURL?: string;

  @IsOptional()
  @IsString()
  content?: string;
}
