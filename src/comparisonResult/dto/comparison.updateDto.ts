import { PartialType } from '@nestjs/mapped-types';
import { CreateComparisonResultDto } from './comparison.createDto';

export class UpdateComparisonResultDto extends PartialType(CreateComparisonResultDto) {}
