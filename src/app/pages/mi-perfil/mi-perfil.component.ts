import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { Administrador } from 'src/app/interfaces/administrador';
import { TypeUser } from 'src/app/enums/type-user';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { Especialista } from 'src/app/interfaces/especialista';
import { Paciente } from 'src/app/interfaces/paciente';
import { HorariosComponent } from 'src/app/components/horarios/horarios.component';
import { Horario } from 'src/app/interfaces/horario';
import { HorarioService } from 'src/app/services/horario.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SpinnerComponent, HorariosComponent],
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss'],
})
export class MiPerfilComponent implements OnInit {
  loading = false;
  user!: any;
  TypeUser = TypeUser;
  showHorarios = false;
  constructor() {}

  ngOnInit(): void {}
}
