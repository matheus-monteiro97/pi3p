import { Module } from '@nestjs/common';
import { EvidenceService } from './evidence.service';
import { PrismaService } from 'src/prisma.service';
import { EvidenceController } from './evidence.controller';

@Module({
  controllers: [EvidenceController],
  providers: [EvidenceService, PrismaService],
})
export class EvidenceModule {}
