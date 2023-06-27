import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameUserPipe } from 'src/app/pipes/name-user.pipe';
import { Administrador } from 'src/app/interfaces/administrador';
import { Especialista } from 'src/app/interfaces/especialista';
import { Paciente } from 'src/app/interfaces/paciente';
import { Turno } from 'src/app/interfaces/turno';
import { Route, Router, ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { TurnoService } from 'src/app/services/turno.service';
import { ModalReviewComponent } from 'src/app/components/modal-review/modal-review.component';
import { ModalCustomComponent } from 'src/app/components/modal-custom/modal-custom.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { SpinnerBootstrapComponent } from 'src/app/components/spinner-bootstrap/spinner-bootstrap.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TableConfig, jsPDF } from 'jspdf';
import { BoolToStringPipe } from 'src/app/pipes/bool-to-string.pipe';
import { RowTableDirective } from 'src/app/directives/row-table.directive';
import { BtnScaleDirective } from 'src/app/directives/btn-scale.directive';

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
    BoolToStringPipe,
    RouterModule,
    RowTableDirective,
    BtnScaleDirective,
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
  form: FormGroup;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private turnoService: TurnoService
  ) {
    this.form = new FormGroup({
      esp: new FormControl(null),
    });
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
        .getTurnosRealizadosByField(this.paciente.id || '', 'paciente')
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

  back(){
    history.back()
  }

  exportToPDF() {
    
    const value = this.form.controls['esp'].value;
    if (value) {
      const turnos = this.turnos.filter((t) => t.especialista === value);
      this.createPDF(turnos);
      this.showModalExport =false;
    } else {
      this.createPDF(this.turnos);
      this.showModalExport =false;
    }
  }

  createPDF(turnos: Turno[]) {
    
    const data: any = [];
    turnos.forEach((t) => {
      const esp = this.users.filter((u) => u.id === t.especialista)[0];
      const obj = {
        Especialista: `${esp.name} ${esp.lastName}`,
        Especialidad: t.especialidad,
        Fecha: t.fecha,
        Altura: t.control?.altura.toString(),
        Peso: t.control?.peso.toString(),
        Temperatura: t.control?.temperatura.toString(),
        Presion: t.control?.presion.toString(),
      };
      data.push(obj);
    });

    const headers = [
      'Especialista',
      'Especialidad',
      'Fecha',
      'Altura',
      'Peso',
      'Temperatura',
      'Presion',
    ];
    const config: TableConfig = {
      headerBackgroundColor: '#5188FF',
      autoSize: false,
      padding: 5,
      fontSize:14
    };

    const now = new Date(Date.now()).toLocaleString().split(',').join(' ');
    const pdf = new jsPDF('p','pt','a4');

    pdf.addImage('../../../assets/icon.png', 'JPG', 500, 50, 75, 75);
    pdf.text('HISTORIA CLINICA:',20, 100);    
    pdf.text(`Fecha: ${now}`,20, 125);
    pdf.table(20, 150, data, headers, config);
    pdf.save('historial_'+ now +'.pdf');
  }
}
