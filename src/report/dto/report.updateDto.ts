import { PartialType } from '@nestjs/mapped-types';
import { CreateReportDto } from './report.createDto';

export class UpdateReportDto extends PartialType(CreateReportDto) {}
