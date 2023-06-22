import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { Administrador } from 'src/app/interfaces/administrador';
import { Especialista } from 'src/app/interfaces/especialista';
import { Paciente } from 'src/app/interfaces/paciente';

@Component({
  selector: 'app-bienvenido',  
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SpinnerComponent],
})
export class BienvenidoComponent implements OnInit{
  user !: Administrador | Especialista | Paciente | null;
  loading : boolean = false;
  
  ngOnInit(): void {

  }
}
