import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { TypeUser } from 'src/app/enums/type-user';
import { HorariosComponent } from 'src/app/components/horarios/horarios.component';
import { UserService } from 'src/app/services/user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule, NavbarComponent, SpinnerComponent, HorariosComponent, RouterModule],
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss'],
})
export class MiPerfilComponent implements OnInit {
  loading = false;
  user!: any;
  TypeUser = TypeUser;
  showHorarios = false;
  constructor(private userService : UserService, private router : Router) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }

  navigate(id: string){
    this.router.navigate(['/historia-clinica', id])
  }
}
