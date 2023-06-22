import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { TurnoService } from 'src/app/services/turno.service';
import { Horario } from 'src/app/interfaces/horario';
import { ModalCustomComponent } from '../modal-custom/modal-custom.component';
import { HorarioService } from 'src/app/services/horario.service';
import { Observable, Subscription } from 'rxjs';
import { ModalTurnosComponent } from '../modal-turnos/modal-turnos.component';
@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [
    CommonModule,
    MatRadioModule,
    ModalCustomComponent,
    ModalTurnosComponent,
  ],
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss'],
})
export class HorariosComponent implements OnInit {
  @Input() showHorarios!: boolean;
  @Output() closeHorariosEvent = new EventEmitter<boolean>();
  @Output() loadingEvent = new EventEmitter<boolean>();
  @Input() user!: any;
  showTurnos = false;
  showModal = false;
  horario!: Horario;
  horarioOld!: Horario;
  changes: any = [];
  subsHorarios!: Subscription;
  subsTurnos!: Subscription;

  constructor(
    private turnoService: TurnoService,
    private horarioService: HorarioService
  ) {}

  ngOnInit() {
    this.subsHorarios = this.horarioService
      .getHorarios(this.user?.id)
      .subscribe((res) => {
        this.horario = res[0];
        this.horarioOld = JSON.parse(JSON.stringify(this.horario));
      });
  }

  updateHorarios() {
    this.horario.especialidades.forEach((item) => {
      item.days.forEach((day) => {
        if (!day.valid && day.turnos.length > 0) {
          day.turnos = [];
        }
      });
    });
    this.loadingEvent.emit(true);
    this.horarioService.updateHorario(this.horario).then(res=>{
      this.loadingEvent.emit(false);      
    });
    this.deleteDifferences();
    this.showModal = false;
  }

  changeRadio(iesp: number, iday: number, valid: boolean) {
    this.horario.especialidades.forEach((esp) => {
      esp.days[iday].valid = false;
    });
    this.horario.especialidades[iesp].days[iday].valid = valid;
  }

  searchDifferences() {
    const changesArray: any = [];
    this.horarioOld.especialidades.forEach((item: any, i: number) => {
      const esp: any = {
        name: item.name,
        days: [],
      };
      item.days.forEach((day: any, z: number) => {
        const currentValid = this.horario.especialidades[i].days[z].valid;
        if (day.valid !== currentValid && !currentValid) {
          esp.days.push(day);
        }
      });
      changesArray.push(esp);
    });
    this.changes = changesArray;
  }

  deleteDifferences() {
    this.searchDifferences();
    this.changes.forEach((item: any) => {
      item.days.forEach((day: any) => {
        if (day.turnos.length > 0)
          this.deleteAllTurnos(this.user.id, day.day, item.name);
      });
    });
  }

  deleteAllTurnos(especialista: string, day: string, especialidad: string) {
    this.subsTurnos = this.turnoService
      .getTurnosByQuery(especialista, day, especialidad)
      .subscribe((res) => {
        res.forEach((item) => {
          if (item.estado === 'pendiente') {
            item.estado = 'rechazado'
            item.motivo = 'Cambio de horario'
            this.turnoService.updateTurnoById(item);
          } else if(item.estado === 'libre'){
            this.turnoService.deleteDocById(item.id || ' ');
          }
        });
      });
  }

  ngOnDestroy() {
    this.subsHorarios.unsubscribe();
    if (this.subsTurnos) this.subsTurnos.unsubscribe();
  }
}
