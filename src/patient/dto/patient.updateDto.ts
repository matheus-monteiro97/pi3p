import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './patient.createDto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {}
