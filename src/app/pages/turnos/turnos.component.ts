import { Component, OnInit, ViewChild } from '@angular/core';
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
import { NameUserPipe } from 'src/app/pipes/name-user.pipe';
import { TableTurnosComponent } from 'src/app/components/table-turnos/table-turnos.component';
import { BoolToStringPipe } from 'src/app/pipes/bool-to-string.pipe';

@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    SpinnerComponent,
    ModalCustomComponent,
    ModalMotivosComponent,
    ModalReviewComponent,
    FilterTurnosComponent,
    TableTurnosComponent,
    BoolToStringPipe,
  ],
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss'],
})
export class TurnosComponent implements OnInit {
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
  showModalDinamicos = false;
  modeHistorial = false;
  subsUsers!: Subscription;
  subsEsp!: Subscription;
  subsTurnos!: Subscription;
  fechas: string[] = [];
  @ViewChild('filter') filter!: FilterTurnosComponent;

  constructor(
    private turnoService: TurnoService,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.subsUsers = this.userService.getUsers().subscribe((res) => {
      this.users = res;
    });
    this.subsEsp = this.userService.getSpecialties().subscribe((res) => {
      this.especialidades = res;
    });

    this.subsTurnos = this.turnoService
      .getTurnosByDistinctEstado('libre')
      .subscribe((res) => {
        this.setTurnos(res);
      });
  }

  setTurnos(arrayTurnos: Turno[]) {
    arrayTurnos = arrayTurnos.sort((x, y) => {
      const time1 = new Date(x.fecha).getTime();
      const time2 = new Date(y.fecha).getTime();
      return time1 > time2 ? 1 : time1 < time2 ? -1 : 0;
    });

    arrayTurnos.forEach((t) => {
      const day = t.fecha.split(' ')[0];
      if (!this.fechas.includes(day)) this.fechas.push(day);
    });

    this.turnos = arrayTurnos;
    if (!this.turnosCopy) this.turnosCopy = arrayTurnos;
    else this.turnosCopy = this.filter.filter(arrayTurnos);
  }

  updateTurno() {
    this.loading = true;
    this.showModal = false;
    if (this.turnoSelected.estado === 'delete') {
      this.turnoService
        .deleteDocById(this.turnoSelected.id || '')
        .then((res) => {
          this.loading = false;
        });
    } else {
      this.turnoService.updateTurnoById(this.turnoSelected).then((res) => {
        this.loading = false;
      });
    }
  }

  showHistorialMode() {
    this.filter.form.reset();
    this.modeHistorial = !this.modeHistorial;
    if (this.modeHistorial)
      this.turnosCopy = this.turnos.filter((t) => t.estado === 'realizado');
    else this.turnosCopy = this.turnos;
  }

  ngOnDestroy() {
    this.subsEsp.unsubscribe();
    this.subsUsers.unsubscribe();
    this.subsTurnos.unsubscribe();
  }
}
