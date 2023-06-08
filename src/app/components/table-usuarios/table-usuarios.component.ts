import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Paciente } from 'src/app/interfaces/paciente';
import { Especialista } from 'src/app/interfaces/especialista';
import { TypeUser } from 'src/app/enums/type-user';

@Component({
  selector: 'app-table-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-usuarios.component.html',
  styleUrls: ['./table-usuarios.component.scss'],
})
export class TableUsuariosComponent implements OnInit {
  
  @Input() pacientesList!: Paciente[];
  @Input() especialistasList!: Especialista[];
  @Input() headers!: Array<string>;
  @Output() changeValidityEvent = new EventEmitter<Especialista>();

  ngOnInit(): void {}

}
