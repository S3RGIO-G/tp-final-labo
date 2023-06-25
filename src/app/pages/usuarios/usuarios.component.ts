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
import { Especialidad } from 'src/app/interfaces/especialidad';
import { ExporterService } from 'src/app/services/exporter.service';

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
  especialidades !: Especialidad[];
  users !: any[];
  
  constructor(private userService: UserService, private exporterService: ExporterService) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.userService.getUsers().subscribe(res=>{
      this.especialistasList = res.filter(u=> u.type === 2) as Especialista[];
      this.pacientesList = res.filter(u=> u.type === 3) as Paciente[];
      this.users = res;
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

  exportUsers(){
    const users : any = [];
    this.users.forEach(u => {
      
      let user = {
        nombre: '',
        apellido : '',
        email:'',
        edad: 0,
        dni: 0,
        tipo: '',
        especialidades: '-',
        obraSocial: '-'
      }

      user.nombre = u.name;
      user.apellido = u.lastName;
      user.edad = u.age;
      user.dni = u.dni;
      user.email = u.email;
      user.tipo = u.type === 1 ? 'Administrador' : u.type === 2 ? 'Especialista' : 'Paciente';

      if(u.type === 3)user.obraSocial = u.obraSocial;
      if(u.type === 2)user.especialidades = u.especialidad.join(', ');
      users.push(user);
    })

    this.exporterService.exportToExcel(users, 'usuarios');
  }
}
