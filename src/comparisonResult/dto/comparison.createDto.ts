import {
    IsUUID,
    IsString,
    IsNumber,
    IsDateString,
  } from 'class-validator';
  
  export class CreateComparisonResultDto {
    @IsString()
    result: string;
  
    @IsNumber()
    precision: number;
  
    @IsDateString()
    dateAnalysis: string;
  
    @IsUUID()
    evidenceId: string;
  }
  