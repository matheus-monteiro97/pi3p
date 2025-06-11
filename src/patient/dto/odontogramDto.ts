import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OdontogramEntryDto {
  @ApiProperty({ example: 25, description: 'Número do dente (FDI)' })
  @IsInt()
  toothNumber: number;

  @ApiProperty({ example: 'Ausente ou danificado' })
  @IsString()
  note: string;
}
