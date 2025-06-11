import { PartialType } from '@nestjs/swagger';
import { CreatePatientDto } from './patient.createDto';
import { OdontogramEntryDto } from './odontogramDto';
import {
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OdontogramEntryDto)
  odontogramEntries?: OdontogramEntryDto[];
}

