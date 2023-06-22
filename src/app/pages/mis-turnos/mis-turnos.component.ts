import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { ModalCustomComponent } from 'src/app/components/modal-custom/modal-custom.component';
import { TurnoService } from 'src/app/services/turno.service';
import { UserService } from 'src/app/services/user.service';
import { Administrador } from 'src/app/interfaces/administrador';
import { Paciente } from 'src/app/interfaces/paciente';
import { Especialista } from 'src/app/interfaces/especialista';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { Turno } from 'src/app/interfaces/turno';
import { Subscription } from 'rxjs';
import { ModalReviewComponent } from 'src/app/components/modal-review/modal-review.component';
import { ModalMotivosComponent } from 'src/app/components/modal-motivos/modal-motivos.component';
import { FilterTurnosComponent } from 'src/app/components/filter-turnos/filter-turnos.component';
import { DateTurnoPipe } from 'src/app/pipes/date-turno.pipe';
import { NameUserPipe } from 'src/app/pipes/name-user.pipe';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    SpinnerComponent,
    ModalCustomComponent,
    ModalReviewComponent,
    ModalMotivosComponent,
    FilterTurnosComponent,
    NameUserPipe,
    DateTurnoPipe,
  ],
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss'],
})
export class MisTurnosComponent implements OnInit {
  loading = false;
  user!: any;
  users!: Administrador[] | Paciente[] | Especialista[];
  especialidades!: Especialidad[];
  turnos!: Turno[];
  turnosCopy!: Turno[];
  turnoSelected!: Turno;
  showModal = false;
  showModalReview = false;
  showModalMotivos = false;
  subsUsers!: Subscription;
  subsEsp!: Subscription;
  subsTurnos!: Subscription;

  constructor(
    private turnoService: TurnoService,
    private userService: UserService
  ) {
  }
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.subsUsers = this.userService.getUsers().subscribe((res) => {
      this.users = res;
    });
    this.subsEsp = this.userService.getSpecialties().subscribe((res) => {
      this.especialidades = res;
    });
    if (this.user.type === 2) {
      this.subsTurnos = this.turnoService
        .getTurnosByEspecialista(this.user.id)
        .subscribe((res) => {
          this.turnos = res;
          this.turnosCopy = res;
        });
    } else {
      this.subsTurnos = this.turnoService
        .getTurnosByPaciente(this.user.id)
        .subscribe((res) => {
          this.turnos = res;
          this.turnosCopy = res;
        });
    }
  }

  setChange(newState: string, i: number) {
    this.turnoSelected = { ...this.turnos[i], estado: newState };
    this.showModal = true;
  }

  changeState() {
    this.loading = true;
    this.showModal = false;
    this.turnoService.updateTurnoById(this.turnoSelected).then((res) => {
      this.loading = false;
    });
  }

  bajaTurno(state: string, i:number){
    this.turnoSelected = {...this.turnos[i], estado: state}
    this.showModalMotivos = true;
  }

  showMotivos(i:number){
    this.turnoSelected = this.turnos[i];
    this.showModalMotivos = true;
  }

  selectTurno(i: number) {
    this.turnoSelected = this.turnos[i];
    this.showModalReview = true;
  }

  ngOnDestroy() {
    this.subsEsp.unsubscribe();
    this.subsUsers.unsubscribe();
    this.subsTurnos.unsubscribe();
  }
}
