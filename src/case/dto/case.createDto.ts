import { Classification, StatusCase } from '@prisma/client';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateCaseDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsEnum(Classification)
    classification: Classification

    @IsOptional()
    @IsEnum(StatusCase, { message: 'O status do caso  deve ser ANDAMENTO, FINALIZADO ou ARQUIVADO.' })
    statusCase?: StatusCase;

    @IsOptional()
    @IsString()
    managerId?: string;
}