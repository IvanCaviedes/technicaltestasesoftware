import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'customTimeFormat', async: false })
export class CustomTimeFormatConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any) {
    // Verifica si el valor es una cadena y si tiene el formato "00:00"
    if (typeof value !== 'string' || !/^\d{2}:\d{2}$/.test(value)) {
      return false;
    }

    // Verifica si la hora es válida
    const [hours, minutes] = value.split(':');
    const parsedHours = parseInt(hours, 10);
    const parsedMinutes = parseInt(minutes, 10);

    return (
      parsedHours >= 0 &&
      parsedHours <= 23 &&
      parsedMinutes >= 0 &&
      parsedMinutes <= 59
    );
  }

  defaultMessage() {
    return 'El campo debe ser una hora con el formato 00:00';
  }
}

export function TimeHourFormat(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CustomTimeFormatConstraint,
    });
  };
}
