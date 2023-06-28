import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Turno } from 'src/app/interfaces/turno';
import { Administrador } from 'src/app/interfaces/administrador';
import { Paciente } from 'src/app/interfaces/paciente';
import { Especialista } from 'src/app/interfaces/especialista';
import { NameUserPipe } from 'src/app/pipes/name-user.pipe';
import { TurnoStateDirective } from 'src/app/directives/turno-state.directive';
import { RowTableDirective } from 'src/app/directives/row-table.directive';
import { TurnoHistorialDirective } from 'src/app/directives/turno-historial.directive';

@Component({
  selector: 'app-table-turnos',
  standalone: true,
  imports: [CommonModule, NameUserPipe, TurnoStateDirective, RowTableDirective, TurnoHistorialDirective],
  templateUrl: './table-turnos.component.html',
  styleUrls: ['./table-turnos.component.scss'],
})
export class TableTurnosComponent {
  @Input() user!: any;
  @Input() users!: Administrador[] | Paciente[] | Especialista[];
  @Input() turnos!: Turno[];
  @Input() modeHistorial!: boolean;
  @Output() turnoSelected = new EventEmitter<Turno>();
  @Output() showModalControl = new EventEmitter<boolean>();
  @Output() showModalMotivos = new EventEmitter<boolean>();
  @Output() showModalReview = new EventEmitter<boolean>();
  @Output() showModalDinamicos = new EventEmitter<boolean>();
  @Output() showModal = new EventEmitter<boolean>();

  setChange(newState: string, i: number) {
    this.turnoSelected.emit({ ...this.turnos[i], estado: newState });
    switch (newState) {
      case 'realizado':
        this.showModalControl.emit(true);
        break;
      case 'cancelado':
        this.showModalMotivos.emit(true);
        break;
      case 'rechazado':
        this.showModalMotivos.emit(true);
        break;
      default:
        this.showModal.emit(true);
    }
  }

  showMotivos(i: number) {
    this.turnoSelected.emit(this.turnos[i]);
    this.showModalMotivos.emit(true);
  }
  showReview(i: number) {
    this.turnoSelected.emit(this.turnos[i]);
    this.showModalReview.emit(true);
  }

  showDinamicos(i: number) {
    this.turnoSelected.emit(this.turnos[i]);
    this.showModalDinamicos.emit(true);
  }
}
