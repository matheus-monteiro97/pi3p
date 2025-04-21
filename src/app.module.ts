import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { EvidenceModule } from './evidence/evidence.module';
import { CaseModule } from './case/case.module';
import { ComparisonResultModule } from './comparisonResult/comparison.module';
import { ReportModule } from './report/report.module';
import { PatientModule } from './patient/patient.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';

@Module({
  imports: [UserModule, AuthModule, EvidenceModule, CaseModule, ComparisonResultModule, ReportModule, PatientModule, 
     MailerModule.forRoot({
          transport: {
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          },
          defaults: {
            from: '"Sua Aplicação 👻" <no-reply@suaapp.com>',
          },
          template: {
            dir: join(__dirname, 'templates'),
            // adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        }),
  ],
  providers: [PrismaService],
})
export class AppModule {}

