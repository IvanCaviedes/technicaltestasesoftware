import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'DateFormatTimestamp', async: false })
export class CustomDateFormatConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any) {
    // Verifica si el valor es una cadena y si tiene el formato "dd/mm/yyyy"
    if (typeof value !== 'string' || !/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      return false;
    }

    // Verifica si la fecha es válida utilizando la función Date.parse
    const date = new Date(value);
    return !isNaN(date.getTime());
  }

  defaultMessage() {
    return 'El campo debe ser una fecha con el formato dd/mm/yyyy';
  }
}

export function DateFormatTimestamp(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CustomDateFormatConstraint,
    });
  };
}
