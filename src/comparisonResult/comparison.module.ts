import { Module } from '@nestjs/common';
import { ComparisonResultService } from './comparison.service';
import { ComparisonResultController } from './comparison.controller';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ComparisonResultController],
  providers: [ComparisonResultService],
})
export class ComparisonResultModule {}
