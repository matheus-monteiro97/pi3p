import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { IsStrongPassword } from 'src/validators/isStrongPassword';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({ message: 'Senha fraca: use maiúscula, minúscula, número e símbolo.' })
  password: string;
  
  @IsEnum(Role, { message: 'Role deve ser ADMIN, PERITO ou ASSISTENTE.' })
  role: Role;
}
