import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTurno',
  standalone: true,
})
export class DateTurnoPipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    const hour = date.getHours();
    let response = value.replaceAll('/', '-').split(' ');
    if (hour > 12) {
      switch (hour) {
        case 13:
          response[1] = '1:00 PM';
          break;
        case 14:
          response[1] = '2:00 PM';

          break;
        case 15:
          response[1] = '3:00 PM';

          break;
        case 16:
          response[1] = '4:00 PM';

          break;
        case 17:
          response[1] = '5:00 PM';

          break;
      }
    } else {
      response[1] = `${hour}:00 AM`;
    }

    value = response.join(' ');

    return value;
  }
}
