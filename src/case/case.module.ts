import { Module } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseController } from './case.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CaseController],
  providers: [CaseService, PrismaService],
})
export class CaseModule {}
