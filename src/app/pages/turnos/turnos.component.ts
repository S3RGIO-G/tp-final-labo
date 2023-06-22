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
import { NameUserPipe } from 'src/app/pipes/name-user.pipe';

@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    SpinnerComponent,
    ModalMotivosComponent,
    ModalReviewComponent,
    FilterTurnosComponent,
    NameUserPipe,
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

    this.subsTurnos = this.turnoService
      .getTurnosByDistinctEstado('libre')
      .subscribe((res) => {
        const data = res.filter(turno => turno.paciente !== null);
        this.turnos = data;
        this.turnosCopy = data;
      });
  }

  bajaTurno(state: string, i: number) {
    this.turnoSelected = { ...this.turnos[i], estado: state };
    this.showModalMotivos = true;
  }

  showMotivos(i:number){
    this.turnoSelected = this.turnos[i];
    this.showModalMotivos = true;
  }

  showReview(i: number) {
    this.turnoSelected = this.turnos[i];
    this.showModalReview = true;
  }

  ngOnDestroy() {
    this.subsEsp.unsubscribe();
    this.subsUsers.unsubscribe();
    this.subsTurnos.unsubscribe();
  }
}
