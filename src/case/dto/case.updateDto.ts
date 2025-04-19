import { PartialType } from '@nestjs/mapped-types';
import { CreateCaseDto } from './case.createDto';

export class UpdateCaseDto extends PartialType(CreateCaseDto) {}
