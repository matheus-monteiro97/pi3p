import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/jwt.module';
import { EvidenceModule } from './evidence/evidence.module';
import { CaseModule } from './case/case.module';

@Module({
  imports: [UserModule, AuthModule, EvidenceModule, CaseModule],
  providers: [PrismaService],
})
export class AppModule {}

