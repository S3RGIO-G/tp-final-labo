import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { LogService } from 'src/app/services/log.service';
import { UserService } from 'src/app/services/user.service';
import { Log } from 'src/app/interfaces/log';
import {} from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { ChartPieComponent } from 'src/app/components/chart-pie/chart-pie.component';
import { RowTableDirective } from 'src/app/directives/row-table.directive';
import { SpinnerBootstrapComponent } from 'src/app/components/spinner-bootstrap/spinner-bootstrap.component';
import { TurnoService } from 'src/app/services/turno.service';
import { Turno } from 'src/app/interfaces/turno';
import { FormInputComponent } from 'src/app/components/form-input/form-input.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormValidator } from 'src/app/validators/forms.validator';
import { ExporterService } from 'src/app/services/exporter.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

Chart.register(...registerables);

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [
    CommonModule,
    RowTableDirective,
    MatTabsModule,
    ChartPieComponent,
    SpinnerBootstrapComponent,
    FormInputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})
export class EstadisticasComponent {
  form: FormGroup;
  user!: any;
  loadingData = false;
  logs!: Log[];
  turnos!: Turno[];
  dias!: string[];
  especialidades!: string[];
  especialistas!: any[];
  data!: { name: string; total: number }[];
  filterApplied!: number;

  @ViewChild('chart') chart!: ChartPieComponent;
  @ViewChild('content') content!: ElementRef;

  constructor(
    private logService: LogService,
    private userService: UserService,
    private turnoService: TurnoService,
    private exporterService: ExporterService
  ) {
    this.form = new FormGroup({
      select: new FormControl(null),
      desde: new FormControl(null, [
        Validators.required,
        FormValidator.validDate,
        FormValidator.dateFrom,
      ]),
      hasta: new FormControl(null, [
        Validators.required,
        FormValidator.validDate,
        FormValidator.dateTo,
      ]),
    });
  }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.loadingData = true;

    this.logService.getLogs().subscribe((res) => {
      this.logs = res;
      this.logs.sort((x, y) => {
        const t1 = new Date(`${x.day} ${x.hour}`);
        const t2 = new Date(`${y.day} ${y.hour}`);
        return t1 > t2 ? -1 : t1 < t2 ? 1 : 0;
      });
      this.loadingData = false;
    });

    this.userService.getUsersByType(2).subscribe((res) => {
      this.especialistas = [];
      res.forEach((u) => {
        this.especialistas.push({
          name: `${u.name} ${u.lastName}`,
          id: u.id,
        });
      });
    });

    this.turnoService.getTurnosByDistinctEstado('libre').subscribe((res) => {
      this.dias = [];
      this.especialidades = [];

      res.sort((x, y) => {
        const t1 = new Date(`${x.fecha}`);
        const t2 = new Date(`${y.fecha}`);
        return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
      });

      res.forEach((t) => {
        const day = t.fecha.split(' ')[0];
        if (!this.dias.includes(day)) this.dias.push(day);
        if (!this.especialidades.includes(t.especialidad))
          this.especialidades.push(t.especialidad);
      });

      this.turnos = res;
      if (!this.select.value) this.select.setValue(1);
      this.filtrar();
    });
  }

  filtrar(type = this.select.value) {
    if (type > 2 && !this.form.valid) return;
    switch (type) {
      case 1:
        this.filtrarByEspecialidad();
        break;
      case 2:
        this.filtrarByDay();
        break;
      case 3:
        this.filtrarByState('pendiente');
        break;
      case 4:
        this.filtrarByState('realizado');
        break;
    }
  }

  filtrarByEspecialidad() {
    const estruct = this.generarEstructura(this.especialidades);
    this.turnos.forEach((t) => {
      estruct.forEach((item: any) => {
        if (t.especialidad === item.name) {
          item.counter++;
          return;
        }
      });
    });
    this.generarChart(estruct);
  }

  filtrarByDay() {
    const estruct = this.generarEstructura(this.dias);
    this.turnos.forEach((t) => {
      estruct.forEach((item: any) => {
        const dia = t.fecha.split(' ')[0];
        if (dia === item.name) {
          item.counter++;
          return;
        }
      });
    });
    this.generarChart(estruct);
  }

  filtrarByState(estado: string) {
    const estruct = this.generarEstructuraWithID(this.especialistas);
    const turnosFiltered = this.turnos.filter((t) => {
      const dia = new Date(t.fecha.split(' ')[0]).getTime();
      const desde = new Date(this.desde.value).getTime();
      const hasta = new Date(this.hasta.value).getTime();
      if (t.estado !== estado) {
        return false;
      } else if (dia < desde || dia > hasta) {
        return false;
      }
      return true;
    });

    turnosFiltered.forEach((t) => {
      estruct.forEach((item: any) => {
        if (t.especialista === item.id) {
          item.counter++;
          return;
        }
      });
    });

    this.generarChart(estruct);
  }

  generarChart(content: any[]) {
    this.chart.labels = [];
    this.chart.bgColors = [];
    this.chart.data = [];
    this.data = [];

    content.forEach((c) => {
      this.chart.labels.push(c.name);
      this.chart.data.push(c.counter);
      this.chart.bgColors.push(this.getRandomColor());
      this.data.push({ name: c.name, total: c.counter });
    });

    this.filterApplied = this.select.value;

    setTimeout(() => {
      if (!this.chart.chartRef) this.chart.createChart();
      else {
        this.chart.chartRef.destroy();
        this.chart.createChart();
      }
    }, 10);
  }

  generarEstructura(array: string[]) {
    const estructura: any = [];
    array.forEach((i) => {
      const obj = {
        name: i,
        counter: 0,
      };
      estructura.push(obj);
    });
    return estructura;
  }

  generarEstructuraWithID(array: { id: string; name: string }[]) {
    const estructura: any = [];
    array.forEach((i) => {
      const obj = {
        id: i.id,
        name: i.name,
        counter: 0,
      };
      estructura.push(obj);
    });
    return estructura;
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  exportToExcel() {
    const data: any = [];
    this.logs.forEach((l) => {
      data.push({
        nombre: `${l.nameUser} ${l.lastNameUser}`,
        dia: l.day,
        hora: l.hour,
      });
    });
    this.exporterService.exportToExcel(data, 'logs');
  }

  async exportToPDF() {
    const pdf = new jsPDF('p', 'pt', 'a4');
    const now = new Date(Date.now()).toLocaleString().split(',').join(' ');

    pdf.addImage('../../../assets/icon.png', 'JPG', 500, 50, 75, 75);
    pdf.text('ESTADISTICAS:', 20, 100);
    pdf.text(`Fecha: ${now}`, 20, 125);
    let y = 150;
    switch (this.filterApplied) {
      case 1:
        pdf.text(`Filtrado por: Especialidad`, 20, y);
        break;
      case 2:
        pdf.text(`Filtrado por: Dia`, 20, y);
        break;
      case 3:
        pdf.text(`Filtrado por: Pendientes por Especialista`, 20, y);
        y += 25;
        pdf.text(`Periodo ${this.desde.value} a ${this.hasta.value}`, 20, y);
        break;
      case 4:
        pdf.text(`Filtrado por: Realizados por Especialista`, 20, y);
        y += 25;
        pdf.text(`Periodo ${this.desde.value} a ${this.hasta.value}`, 20, y);
        break;
    }
    y += 30;
    this.data.forEach((d) => {
      pdf.setFontSize(14);
      pdf.text(`Total '${d.name}' : ${d.total}`, 20, y);
      y += 18;
    });

    await html2canvas(this.content.nativeElement, {
      useCORS: true,
      allowTaint: true,
      width: 520,
    }).then((canvas) => {
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 140, y + 15, 400, 300);
    });
    pdf.save('estadisticas' + `_${Date.now()}` + '.pdf');
  }

  get select() {
    return this.form.controls['select'];
  }
  get desde() {
    return this.form.controls['desde'];
  }
  get hasta() {
    return this.form.controls['hasta'];
  }
}
