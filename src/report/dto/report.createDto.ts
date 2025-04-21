import { IsString, IsNotEmpty, IsUUID, IsEnum } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUUID()
  caseId: string;
}
