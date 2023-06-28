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
  form: FormGroup;
  showModalFilters = false;
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
      altura: new FormControl(null),
      peso: new FormControl(null),
      temperatura: new FormControl(null),
      presion: new FormControl(null),
      caries: new FormControl(null),
      glucosa: new FormControl(null),
      anteojos: new FormControl(null),
      colesterol: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }

  filter(list: Turno[] = this.turnos): Turno[] {
    let turnos = list;

    //* Comienza
    turnos = turnos.filter((t) => {
      const date = t.fecha.split(' ')[0];

      if (this.fecha.value && date !== this.fecha.value) {
        return false;
      }

      if (
        this.estado.value &&
        !this.modeHistorial &&
        t.estado !== this.estado.value
      )
        return false;
      else if (this.modeHistorial && t.estado !== 'realizado') return false;

      if (this.esp.value && t.especialidad !== this.esp.value) {
        return false;
      }
      if (this.paciente.value && t.paciente !== this.paciente.value) {
        return false;
      }

      if (
        this.especialista.value &&
        t.especialista !== this.especialista.value
      ) {
        return false;
      }

      if (
        this.altura.value &&
        t.control?.altura !== parseInt(this.altura.value)
      ) {
        return false;
      }
      if (this.peso.value && t.control?.peso !== parseInt(this.peso.value)) {
        return false;
      }
      if (
        this.temperatura.value &&
        t.control?.temperatura !== parseInt(this.temperatura.value)
      ) {
        return false;
      }

      if (
        this.presion.value &&
        t.control?.presion !== parseInt(this.presion.value)
      ) {
        return false;
      }

      let response = true;
      let countCaries = 0;
      let countAnteojos = 0;
      let countGlucosa = 0;
      let countColesterol = 0;
      const lenght = t.control?.dinamico?.length;

      t.control?.dinamico?.forEach((d) => {
        if (this.caries.value) {
          if (d.clave === 'caries' && d.valor !== parseInt(this.caries.value)) {
            response = false;
          } else if (d.clave !== 'caries') {
            countCaries++;
          }

          if (countCaries === lenght) response = false;
        }

        if (this.anteojos.value !== null) {
          if (d.clave === 'anteojos' && d.valor !== this.anteojos.value) {
            response = false;
          } else if (d.clave !== 'anteojos') countAnteojos++;

          if (countAnteojos === lenght) response = false;
        }

        if (this.glucosa.value) {
          if (d.clave === 'glucosa' && d.valor !== parseInt(this.glucosa.value))
            response = false;
          else if(d.clave !== 'glucosa') countGlucosa++;

          if (countGlucosa === lenght) response = false;
        }

        //TODO: definir si usar globulos rojos
        if (this.colesterol.value) {
          if (d.clave === 'colesterol' && d.valor !== parseInt(this.colesterol.value))
            response = false;
          else if(d.clave !== 'colesterol') countColesterol++;

          if (countColesterol === lenght) response = false;
        }
      });
      return response;
    });

    this.filterTurnosEvent.emit(turnos);
    return turnos;
  }

  reset() {
    this.form.reset();
    this.filter();
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
  get altura() {
    return this.form.controls['altura'];
  }
  get peso() {
    return this.form.controls['peso'];
  }
  get temperatura() {
    return this.form.controls['temperatura'];
  }
  get presion() {
    return this.form.controls['presion'];
  }
  get caries() {
    return this.form.controls['caries'];
  }
  get glucosa() {
    return this.form.controls['glucosa'];
  }
  get anteojos() {
    return this.form.controls['anteojos'];
  }
  get colesterol() {
    return this.form.controls['colesterol'];
  }
}
