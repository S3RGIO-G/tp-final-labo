import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { Administrador } from 'src/app/interfaces/administrador';
import { Paciente } from 'src/app/interfaces/paciente';
import { Especialista } from 'src/app/interfaces/especialista';
import { TableUsuariosComponent } from 'src/app/components/table-usuarios/table-usuarios.component';
import { UserService } from 'src/app/services/user.service';
import { RouterModule } from '@angular/router';
import { ModalCustomComponent } from 'src/app/components/modal-custom/modal-custom.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    SpinnerComponent,
    TableUsuariosComponent,
    RouterModule,
    ModalCustomComponent,
  ],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  showModal = false;
  loading = false;
  user!: Administrador | Paciente | Especialista | null;
  especialista !: Especialista;
  pacientesList !: Paciente[];
  especialistasList !: Especialista[];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsersByType(2).subscribe(res =>{
      this.especialistasList = res as Especialista[];
    })
    this.userService.getUsersByType(3).subscribe(res =>{
      this.pacientesList = res as Paciente[];
    })
  }

  changeValidity(user: Especialista){
    this.showModal = true;
    this.especialista = {...user, valid : !user.valid};
  }

  confirmChange(){
    this.showModal = false;
    this.userService.updateUser(this.especialista);
  }
}
