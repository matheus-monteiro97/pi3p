import { IsString, IsEnum, IsUUID, IsOptional } from 'class-validator';
import { Identified, Status } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreatePatientDto {
  @IsString()
  name: string;

  @IsString()
  sex: string;

  @IsOptional()
  @Type(() => Date) 
  birthDate?: Date;

  @IsUUID()
  caseId: string;

  @IsEnum(Identified)
  identified: Identified;

  @IsOptional()
  @IsEnum(Status)
  status?: Status
}
