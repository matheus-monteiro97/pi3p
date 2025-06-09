import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'Email do usuário para solicitar recuperação de senha',
    example: 'usuario@exemplo.com',
  })
  @IsEmail()
  email: string;
}