import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalCustomComponent } from 'src/app/components/modal-custom/modal-custom.component';
import { TurnoService } from 'src/app/services/turno.service';
import { UserService } from 'src/app/services/user.service';
import { Especialista } from 'src/app/interfaces/especialista';
import { Paciente } from 'src/app/interfaces/paciente';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { Turno } from 'src/app/interfaces/turno';
import { Subscription } from 'rxjs';
import { DateTurnoPipe } from 'src/app/pipes/date-turno.pipe';

@Component({
  selector: 'app-solicitar-turno',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    SpinnerComponent,
    ReactiveFormsModule,
    ModalCustomComponent,
    DateTurnoPipe,
  ],
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss'],
})

export class SolicitarTurnoComponent implements OnInit {
  loading = false;
  loadingUsers = false;
  loadingTurnos = false;
  user!: any;
  form: FormGroup;
  showModal = false;
  pacientes!: Paciente[];
  especialistas!: Especialista[];
  especialidades!: Especialidad[];
  especialidadesDisp!: Especialidad[];
  turnos!: Turno[] | null;
  turnoSelected!: Turno | null;

  subsUsers!: Subscription;
  subsEsp!: Subscription;

  constructor(
    private turnoService: TurnoService,
    private userService: UserService
  ) {
    this.form = new FormGroup({
      paciente: new FormControl(null),
      especialista: new FormControl(null),
      especialidad: new FormControl(null),
      date: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    if (this.user.type === 3) this.paciente.setValue(this.user.id);

    this.loadingUsers = true;
    this.subsUsers = this.userService.getUsers().subscribe((res) => {
      this.pacientes = res.filter((user) => user.type === 3) as Paciente[];
      this.especialistas = res.filter(
        (user: any) => user.type === 2 && user.valid
      ) as Especialista[];
      this.loadingUsers = false;
    });

    this.subsEsp = this.userService.getSpecialties().subscribe((res) => {
      this.especialidades = res;
    });
  }



  onSubmit(){
    const turno = {...this.turnoSelected, paciente : this.paciente.value, estado : 'pendiente'};
    this.loading = true;
    this.showModal = false;
    this.turnoService.updateTurnoById(turno as Turno).then(res=>{
      this.loading = false;
      this.turnoSelected = null;
    });
  }

  selectPaciente(paciente: Paciente, event: any, clase: string) {
    this.selectBtn(event, clase);
    this.paciente.setValue(paciente.id);
  }

  selectEspecialista(especialista: Especialista, event: any, clase: string) {
    this.especialidad.reset();
    this.selectBtn(event, clase);
    this.resetStylesBtns('.btn-esp');
    this.turnoSelected = null;
    this.especialista.setValue(especialista.id);

    this.especialidadesDisp = this.especialidades.filter((esp) =>
      especialista.especialidad.includes(esp.name)
    );
  }

  selectEspecialidad(especialidad: Especialidad, event: any, clase: string) {
    this.selectBtn(event, clase);
    this.especialidad.setValue(especialidad.name);
    this.turnoSelected = null;
    this.loadingTurnos = true;
    this.turnoService.getTurnos().subscribe((res) => {
      this.turnos = res.filter(
        (turno) =>
          turno.especialista === this.especialista.value &&
          turno.especialidad === this.especialidad.value &&
          turno.estado === 'libre'
      );
      this.loadingTurnos = false;
    });
  }

  selectTurno(turno: Turno, event: any, clase: string) {
    this.selectBtn(event, clase);
    this.turnoSelected = turno;
  }

  selectBtn(event: any, clase: string) {
    const btn =
      event.target.type === 'button'
        ? event.target
        : event.target.parentElement;
    const buttons = document.querySelectorAll(clase);
    buttons.forEach((btn) => {
      btn.classList.remove('btn-selected');
    });
    btn.classList.add('btn-selected');
  }

  resetStylesBtns(clase: string) {
    const buttons = document.querySelectorAll(clase);
    buttons.forEach((btn) => {
      btn.classList.remove('btn-selected');
    });
  }

  get especialista() {
    return this.form.controls['especialista'];
  }
  get especialidad() {
    return this.form.controls['especialidad'];
  }
  get paciente() {
    return this.form.controls['paciente'];
  }
  get date() {
    return this.form.controls['date'];
  }

  ngOnDestroy() {
    this.subsEsp.unsubscribe();
    this.subsUsers.unsubscribe();
  }
}
