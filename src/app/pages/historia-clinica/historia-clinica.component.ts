import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameUserPipe } from 'src/app/pipes/name-user.pipe';
import { Administrador } from 'src/app/interfaces/administrador';
import { Especialista } from 'src/app/interfaces/especialista';
import { Paciente } from 'src/app/interfaces/paciente';
import { Turno } from 'src/app/interfaces/turno';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TurnoService } from 'src/app/services/turno.service';
import { ModalReviewComponent } from 'src/app/components/modal-review/modal-review.component';
import { ModalCustomComponent } from 'src/app/components/modal-custom/modal-custom.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { SpinnerBootstrapComponent } from 'src/app/components/spinner-bootstrap/spinner-bootstrap.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-historia-clinica',
  standalone: true,
  imports: [
    CommonModule,
    NameUserPipe,
    ModalReviewComponent,
    ModalCustomComponent,
    SpinnerComponent,
    SpinnerBootstrapComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.scss'],
})
export class HistoriaClinicaComponent {
  user!: any;
  users!: Administrador[] | Paciente[] | Especialista[];
  paciente!: null | Paciente;
  turnos!: Turno[];
  turnoSelected!: Turno;
  showError = false;
  loading = false;
  loadingData = false;
  showModalDinamicos = false;
  showModalReview = false;
  showModalExport = false;
  especialistas: string[] = [];
  form : FormGroup;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private turnoService: TurnoService
  ) {
    this.form = new FormGroup({
      esp : new FormControl(null),
    })

  }

  async ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.loadingData = true;
    const id = this.activateRoute.snapshot.params['id'];
    this.paciente = (await this.userService.getUserById(id)).data() as Paciente;

    if (this.paciente) {
      this.userService.getUsers().subscribe((res) => {
        this.users = res;
      });

      this.turnoService
        .getTurnosRealizadosByPaciente(this.paciente.id || '')
        .subscribe((res) => {
          this.setTurnos(res);
          this.loadingData = false;
        });
    } else {
      this.showError = true;
      this.loadingData = false;
    }
  }

  setTurnos(arrayTurnos: Turno[]) {
    arrayTurnos = arrayTurnos.sort((x, y) => {
      const time1 = new Date(x.fecha).getTime();
      const time2 = new Date(y.fecha).getTime();
      return time1 > time2 ? 1 : time1 < time2 ? -1 : 0;
    });

    arrayTurnos.forEach((t) => {
      if (!this.especialistas.includes(t.especialista))
        this.especialistas.push(t.especialista);
    });

    this.turnos = arrayTurnos;
  }

  showDinamicos(turno: Turno) {
    this.turnoSelected = turno;
    this.showModalDinamicos = true;
  }
  showReview(turno: Turno) {
    this.turnoSelected = turno;
    this.showModalReview = true;
  }

  exportToPDF(){
    const value = this.form.controls['esp'].value;
    if(value){
      this.createPDF();
    }
  }



  createPDF(){
    const pdfDefinition: any = {
      content:[
        {
          text:'hola mundo'
        }
      ]
    }

  }
}



// {
//   style: 'tableExample',
//   table: {
//     headerRows: 1,
//     body: [
//       [{text: 'Header 1', style: 'tableHeader'}, {text: 'Header 2', style: 'tableHeader'}, {text: 'Header 3', style: 'tableHeader'}],
//       ['Sample value 1', 'Sample value 2', 'Sample value 3'],
//       ['Sample value 1', 'Sample value 2', 'Sample value 3'],
//       ['Sample value 1', 'Sample value 2', 'Sample value 3'],
//       ['Sample value 1', 'Sample value 2', 'Sample value 3'],
//       ['Sample value 1', 'Sample value 2', 'Sample value 3'],
//     ]
//   },
//   layout: 'lightHorizontalLines'
// },