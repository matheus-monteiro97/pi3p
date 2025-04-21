import { IsString } from 'class-validator';
import { IsStrongPassword } from 'src/validators/isStrongPassword';

export class ResetPasswordDto {
  @IsString()
  token: string;

@IsStrongPassword()
  newPassword: string;
}
