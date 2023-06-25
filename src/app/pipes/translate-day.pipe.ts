import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateDay',
  standalone:true,
})
export class TranslateDayPipe implements PipeTransform {

  transform(value: string): string {
    let mensaje = '';
    switch(value){
      case 'Mon':
        mensaje = "Lunes";
        break;
      case 'Tue':
        mensaje = "Martes";
        break;
      case 'Wed':
        mensaje = "Miercoles";
        break;
      case 'Thu':
        mensaje = "Jueves";
        break;
      case 'Fri':
        mensaje = "Viernes";
        break;
    }

    return mensaje;
  }

}
