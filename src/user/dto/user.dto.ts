import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { IsStrongPassword } from 'src/validators/isStrongPassword';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Matheus Monteiro',
    description: 'Nome completo do usuário',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'matheus@email.com',
    description: 'E-mail válido do usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Senha@123',
    description: 'Senha forte com letra maiúscula, minúscula, número e símbolo',
  })
  @IsStrongPassword({ message: 'Senha fraca: use maiúscula, minúscula, número e símbolo.' })
  password: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Perfil do usuário (ADMIN, PERITO ou ASSISTENTE)',
    enum: Role,
  })
  @IsEnum(Role, { message: 'Role deve ser ADMIN, PERITO ou ASSISTENTE.' })
  role: Role;
}