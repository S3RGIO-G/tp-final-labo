import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolToString',
  standalone:true,
})
export class BoolToStringPipe implements PipeTransform {

  transform(value: any): string {

    if(typeof(value)=== 'boolean'){
      return value ? 'si' : 'no';
    }
    else return value;
  }

}
