import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { Administrador } from 'src/app/interfaces/administrador';
import { Especialista } from 'src/app/interfaces/especialista';
import { Paciente } from 'src/app/interfaces/paciente';
import { UserService } from 'src/app/services/user.service';
import { TypeUser } from 'src/app/enums/type-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class NavbarComponent {
  @Input() usuario : Administrador | Especialista | Paciente | null = null;
  @Output() loadingEvent = new EventEmitter<boolean>();
  @Output() userEvent = new EventEmitter<Administrador | Especialista | Paciente | null>();
  TypeUser = TypeUser;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.usuario = this.userService.getCurrentUser();
  }

  loguot() {
    this.loadingEvent.emit(true);
    setTimeout(() => {
      this.userService
        .logout()
        .then((e) => {
          this.usuario = null;
          this.userEvent.emit(null);
          this.loadingEvent.emit(false);
          localStorage.clear();
          this.router.navigate(['/bienvenido']);
        })
        .catch((err) => {});
    }, 1000);
  }
}
