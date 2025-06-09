import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'src/validators/isStrongPassword';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Token enviado por email para resetar a senha',
    example: 'a1b2c3d4e5f6g7h8',
  })
  @IsString()
  token: string;

  @ApiProperty({
    description: 'Nova senha forte conforme as regras definidas',
    example: 'SenhaForte@1234',
  })
  @IsStrongPassword()
  newPassword: string;
}