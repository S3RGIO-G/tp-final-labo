import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Administrador } from 'src/app/interfaces/administrador';
import { Especialista } from 'src/app/interfaces/especialista';
import { Paciente } from 'src/app/interfaces/paciente';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { Turno } from 'src/app/interfaces/turno';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-filter-turnos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filter-turnos.component.html',
  styleUrls: ['./filter-turnos.component.scss'],
})
export class FilterTurnosComponent implements OnInit {
  form: FormGroup;
  @Input() user!: any;
  @Input() users!: Administrador[] | Paciente[] | Especialista[];
  @Input() especialidades!: Especialidad[];
  @Input() turnos!: Turno[];
  @Output() filterTurnosEvent = new EventEmitter<Turno[]>();

  constructor(private userService: UserService) {
    this.form = new FormGroup({
      esp: new FormControl(null),
      paciente: new FormControl(null),
      especialista: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }

  filter() {
    let turnos = this.turnos;

    if (this.esp.value)
      turnos = turnos.filter((turno) => turno.especialidad === this.esp.value);

    if (this.paciente.value)
      turnos = turnos.filter((turno) => turno.paciente === this.paciente.value);

    if (this.especialista.value)
      turnos = turnos.filter(
        (turno) => turno.especialista === this.especialista.value
      );

    this.filterTurnosEvent.emit(turnos);
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
}
