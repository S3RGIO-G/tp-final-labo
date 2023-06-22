import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Horario } from 'src/app/interfaces/horario';
import { TurnoService } from 'src/app/services/turno.service';
import { HorarioService } from 'src/app/services/horario.service';
import { TranslateDayPipe } from 'src/app/pipes/translate-day.pipe';

@Component({
  selector: 'app-modal-turnos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateDayPipe],
  templateUrl: './modal-turnos.component.html',
  styleUrls: ['./modal-turnos.component.scss'],
})
export class ModalTurnosComponent implements OnInit {
  @Input() user!: any;
  @Input() showModal!: boolean;
  @Input() horario!: Horario;
  @Output() hideModalEvent = new EventEmitter<boolean>();
  @Output() loadingEvent = new EventEmitter<boolean>();
  formTurno: FormGroup;
  options: Array<string> = [];
  days: Array<string> = [];
  turnos!: any;

  constructor(
    private turnoService: TurnoService,
    private horarioService: HorarioService
  ) {
    this.formTurno = new FormGroup({
      especialidad: new FormControl(null),
      dia: new FormControl(null),
      disponible: new FormControl(null),
    });
  }

  ngOnInit(): void {}

  OnSubmit() {
    if (!this.especialidad.value) this.especialidad.setErrors({ esp: true });
    if (!this.dia.value) this.dia.setErrors({ dia: true });
    if (!this.disponible.value) this.disponible.setErrors({ disp: true });

    if (this.formTurno.invalid) return;
    this.horario.especialidades.forEach((item) => {
      item.days.forEach((day) => {
        if (
          item.name === this.especialidad.value &&
          day.day === this.dia.value
        ) {
          day.turnos.push(this.disponible.value);
        }
      });
    });

    this.horarioService.updateHorario(this.horario);
    this.turnoService.addTurnos(
      this.user.id,
      this.disponible.value,
      this.especialidad.value
    );
    this.loadingEvent.emit(true);
    setTimeout(() => {
      this.loadingEvent.emit(false);
      this.hideModalEvent.emit(false);
      this.formTurno.reset();
    }, 1000);
  }

  calculateDisp() {
    let tStamp = new Date(Date.now()).getTime();
    const options = [];
    const OneDay = 1000 * 60 * 60 * 24;
    for (let i = 0; i < 15; i++) {
      tStamp += OneDay;
      const newDay = new Date(tStamp);
      const nameDay = newDay.toDateString().split(' ').splice(0, 1)[0];
      const date = newDay.toLocaleDateString().split('/').reverse().join('/');
      if (nameDay === this.dia.value) {
        this.searchDay(this.especialidad.value, nameDay, date)
          ? null
          : options.push(date);
      }
      if (nameDay === 'Sun' || nameDay === 'Sat') i--;
    }
    this.options = options;
  }

  searchDay(especialidad: string, nameDay: string, date: string) {
    let response = false;
    this.horario.especialidades.forEach((items) => {
      items.days.forEach((day) => {
        if (items.name === especialidad && day.day === nameDay) {
          response = day.turnos.includes(date);
        }
      });
    });
    return response;
  }

  resetFields() {
    const esp = this.especialidad.value;
    this.formTurno.reset();
    this.options = [];
    this.especialidad.setValue(esp);
  }

  cancel(){
    this.formTurno.reset();
    this.hideModalEvent.emit(false);
  }

  get especialidad() {
    return this.formTurno.controls['especialidad'];
  }
  get dia() {
    return this.formTurno.controls['dia'];
  }
  get disponible() {
    return this.formTurno.controls['disponible'];
  }
}
