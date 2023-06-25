import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Administrador } from 'src/app/interfaces/administrador';
import { Especialista } from 'src/app/interfaces/especialista';
import { Paciente } from 'src/app/interfaces/paciente';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { Turno } from 'src/app/interfaces/turno';
import { UserService } from 'src/app/services/user.service';
import { FormInputComponent } from '../form-input/form-input.component';
import { MatSelectModule } from '@angular/material/select';
import { VariableBinding } from '@angular/compiler';

@Component({
  selector: 'app-filter-turnos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormInputComponent,
    MatSelectModule,
  ],
  templateUrl: './filter-turnos.component.html',
  styleUrls: ['./filter-turnos.component.scss'],
})
export class FilterTurnosComponent implements OnInit {
  tags: string[] = [
    'altura',
    'peso',
    'temperatura',
    'presion',
    'caries',
    'anteojos',
    'glucosa',
    'glob. rojos',
  ];
  form: FormGroup;
  @Input() user!: any;
  @Input() users!: Administrador[] | Paciente[] | Especialista[];
  @Input() especialidades!: Especialidad[];
  @Input() turnos!: Turno[];
  @Input() fechas!: string[];
  @Input() modeHistorial!: boolean;
  @Output() filterTurnosEvent = new EventEmitter<Turno[]>();

  constructor(private userService: UserService) {
    this.form = new FormGroup({
      esp: new FormControl(null),
      paciente: new FormControl(null),
      especialista: new FormControl(null),
      fecha: new FormControl(null),
      estado: new FormControl(null),
      plus: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }

  filter() {
    let turnos = this.turnos;
    if (this.esp.value)
      turnos = turnos.filter((t) => t.especialidad === this.esp.value);

    if (this.paciente.value)
      turnos = turnos.filter((t) => t.paciente === this.paciente.value);

    if (this.especialista.value)
      turnos = turnos.filter((t) => t.especialista === this.especialista.value);

    if (this.fecha.value)
      turnos = turnos.filter((t) => {
        const date = t.fecha.split(' ')[0];
        return date === this.fecha.value;
      });

    if (this.estado.value && !this.modeHistorial)
      turnos = turnos.filter((t) => t.estado === this.estado.value);
    else if (this.modeHistorial)
      turnos = turnos.filter((t) => t.estado === 'realizado');

    if (this.plus.value) {
      this.plus.value.forEach((i: string) => {
        const ctrl = this.form.controls[i];
        if (ctrl.value !== '' && ctrl.value !== null) {
          turnos = this.getFilteredList(turnos, ctrl, i);
        }
      });
    }
    this.filterTurnosEvent.emit(turnos);
  }

  updateFilters(event: string[]) {
    const diff = this.tags.filter((i) => event.indexOf(i) === -1);
    diff.forEach((i) => this.form.removeControl(i));
    event.forEach((i) => {
      if (!this.form.controls[i]) {
        if (i !== 'anteojos')
          this.form.addControl(i, new FormControl(null, [Validators.min(0)]));
        else this.form.addControl(i, new FormControl(null));
      }
    });
  }

  getFilteredList(list: Turno[], ctrl: AbstractControl, field: string) {
    switch (field) {
      case 'altura':
        return list.filter((t: Turno) => {
          return t.control?.altura == ctrl.value;
        });
      case 'peso':
        return list.filter((t: Turno) => {
          return t.control?.peso == ctrl.value;
        });
      case 'temperatura':
        return list.filter((t: Turno) => {
          return t.control?.temperatura == ctrl.value;
        });
      case 'presion':
        return list.filter((t: Turno) => {
          return t.control?.presion == ctrl.value;
        });
      default:
        return list.filter((t: Turno) => {
          let res = false;
          t.control?.dinamico?.forEach((d) => {
            if (
              field !== 'anteojos' &&
              d.clave === field &&
              d.valor === parseInt(ctrl.value)
            ) {
              res = true;
            } else if (d.clave === field && d.valor === ctrl.value) {
              res = true;
            }
          });
          return res;
        });
    }
  }

  get esp() {
    return this.form.controls['esp'];
  }
  get paciente() {
    return this.form.controls['paciente'];
  }
  get especialista() {
    return this.form.controls['especialista'];
  }
  get fecha() {
    return this.form.controls['fecha'];
  }
  get estado() {
    return this.form.controls['estado'];
  }
  get plus() {
    return this.form.controls['plus'];
  }
}
