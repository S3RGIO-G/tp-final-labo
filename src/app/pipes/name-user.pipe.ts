import { Pipe, PipeTransform } from '@angular/core';
import { Especialista } from '../interfaces/especialista';
import { Paciente } from '../interfaces/paciente';
import { Administrador } from '../interfaces/administrador';

@Pipe({
  name: 'nameUser',
  standalone: true,
})
export class NameUserPipe implements PipeTransform {
  value = 'No asignado';
  transform(
    value: string | null,
    users: Especialista[] | Paciente[] | Administrador[]
  ): string {
    if (value) {
      users.forEach((u) => {
        if (u.id === value) {
          value = `${u.name} ${u.lastName}`;
        }
      });
    } else {
      value = 'No asignado';
    }
    return value;
  }
}
