import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    registerDecorator,
    ValidationOptions,
  } from 'class-validator';
  
  @ValidatorConstraint({ async: false })
  export class IsStrongPasswordConstraint implements ValidatorConstraintInterface {
    validate(password: string, _args: ValidationArguments) {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
    }
  
    defaultMessage() {
      return 'A senha deve conter pelo menos 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial.';
    }
  }
  
  export function IsStrongPassword(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsStrongPasswordConstraint,
      });
    };
  }
  