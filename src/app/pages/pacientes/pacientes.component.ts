import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableUsuariosComponent } from 'src/app/components/table-usuarios/table-usuarios.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { Paciente } from 'src/app/interfaces/paciente';
import { Administrador } from 'src/app/interfaces/administrador';
import { Especialista } from 'src/app/interfaces/especialista';
import { FabbtnUsersComponent } from 'src/app/components/fabbtn-users/fabbtn-users.component';
import { UserService } from 'src/app/services/user.service';
import { TurnoService } from 'src/app/services/turno.service';
import { Turno } from 'src/app/interfaces/turno';
import { TableTurnosComponent } from 'src/app/components/table-turnos/table-turnos.component';
import { SpinnerBootstrapComponent } from 'src/app/components/spinner-bootstrap/spinner-bootstrap.component';
import { ModalReviewComponent } from 'src/app/components/modal-review/modal-review.component';
import { ModalCustomComponent } from 'src/app/components/modal-custom/modal-custom.component';
import { BoolToStringPipe } from 'src/app/pipes/bool-to-string.pipe';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [
    CommonModule,
    TableUsuariosComponent,
    TableTurnosComponent,
    SpinnerComponent,
    SpinnerBootstrapComponent,
    FabbtnUsersComponent,
    ModalReviewComponent,
    ModalCustomComponent,
    BoolToStringPipe,
  ],
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
})
export class PacientesComponent {
  showTurnos = false;
  showModalReview = false;
  showModalDinamicos = false;
  user!: any;
  loading = false;
  loadingData = false;
  pacientes!: Paciente[];
  turnos!: Turno[];
  turnosCopy!: Turno[];
  turnoSelected !: Turno;

  constructor(
    private userService: UserService,
    private turnoService: TurnoService
  ) {}
  
  async ngOnInit() {
    this.user = this.userService.getCurrentUser();
    const idPacientes: string[] = [];
    const turnos: Turno[] = [];
    const pacientes: Paciente[] = [];
    this.loadingData = true;

    const docs = (
      await this.turnoService.getTurnosRealizadosByFieldPromise(
        this.user.id,
        'especialista'
      )
    ).docs;

    docs.forEach((d) => {
      const turno = d.data();
      const id = turno.paciente as string;
      if (!idPacientes.includes(id)) idPacientes.push(id);
      turnos.push(turno);
    });
    this.turnos = turnos;

    this.userService.getUsersByType(3).subscribe((res) => {
      res.forEach((u) => {
        const id = u.id as string;
        if (idPacientes.includes(id)) {
          pacientes.push(u as Paciente);
        }
      });
      this.pacientes = pacientes;
      this.loadingData = false;
    });
  }

  selectedUser(user: Paciente | Administrador | Especialista) {
    this.turnosCopy = this.turnos.filter(t=> t.paciente === user.id);
    this.turnosCopy = this.turnosCopy.sort((x,y)=>{
      const t1 = new Date(x.fecha).getTime();
      const t2 = new Date(y.fecha).getTime();
      return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
    })
    this.showTurnos = true;
  }
}
