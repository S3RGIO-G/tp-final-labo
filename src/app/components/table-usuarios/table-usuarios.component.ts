import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Paciente } from 'src/app/interfaces/paciente';
import { Especialista } from 'src/app/interfaces/especialista';
import { TypeUser } from 'src/app/enums/type-user';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { Router } from '@angular/router';
import { RowTableDirective } from 'src/app/directives/row-table.directive';

@Component({
  selector: 'app-table-usuarios',
  standalone: true,
  imports: [CommonModule, RowTableDirective],
  templateUrl: './table-usuarios.component.html',
  styleUrls: ['./table-usuarios.component.scss'],
})
export class TableUsuariosComponent implements OnInit {
  
  @Input() pacientesList!: Paciente[];
  @Input() especialistasList!: Especialista[];
  @Input() headers!: Array<string>;
  @Input() especialidades!: Array<Especialidad>;
  @Input() loading !: boolean;
  @Output() changeValidityEvent = new EventEmitter<Especialista>();

  constructor(private router : Router) {
    
  }
  ngOnInit(): void {
  }

  navigate(id: string){
    this.router.navigate(['/historia-clinica', id]);
  }

}
