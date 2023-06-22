import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { LoginAdminGuard } from './guards/login-admin.guard';
import { LogoutGuard } from './guards/logout.guard';
import { LoginPacienteGuard } from './guards/login-paciente.guard';
import { LoginPacOrAdminGuard } from './guards/login-pac-or-admin.guard';
import { LoginPacOrEspGuard } from './guards/login-pac-or-esp.guard';
import { LogoutOrAdminGuard } from './guards/logout-or-admin.guard';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'bienvenido',
    pathMatch: 'full',
  },
  {
    path: 'bienvenido',
    title: 'Bienvenido',
    loadComponent: () =>
      import('./pages/bienvenido/bienvenido.component').then((m) => m.BienvenidoComponent),
  },
  {
    path: 'register', //*No logueados y Administrador
    title: 'Crear cuenta',
    loadComponent: () =>
      import('./pages/register/register.component').then((m) => m.RegisterComponent),
      canActivate: [LogoutOrAdminGuard],
      
  },
  {
    path: 'login', //*No logueados
    title: 'Iniciar Sesíon',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
      canActivate: [LogoutGuard],
  },
  {
    path: 'usuarios',//*Admin
    title: 'Usuarios',
    loadComponent: () =>
      import('./pages/usuarios/usuarios.component').then((m) => m.UsuariosComponent),
      canActivate: [LoginAdminGuard]
  },
  {
    path: 'perfil',//*Logueados
    title: 'Perfil',
    loadComponent: () =>
      import('./pages/mi-perfil/mi-perfil.component').then((m) => m.MiPerfilComponent),
      canActivate: [LoginGuard]
  },
  {
    path: 'misturnos', //*Pacientes y Especialistas
    title: 'Mis Turnos',
    loadComponent: () =>
      import('./pages/mis-turnos/mis-turnos.component').then((m) => m.MisTurnosComponent),
      canActivate: [LoginPacOrEspGuard]
  },
  {
    path: 'turnos',//*Admin
    title: 'Turnos',
    loadComponent: () =>
      import('./pages/turnos/turnos.component').then((m) => m.TurnosComponent),
      canActivate: [LoginAdminGuard]
  },
  {
    path: 'solicitarturno', //*Pacientes y Admins
    title: 'Solicitar Turno',
    loadComponent: () =>
      import('./pages/solicitar-turno/solicitar-turno.component').then((m) => m.SolicitarTurnoComponent),
      canActivate: [LoginPacOrAdminGuard]
  },
  {
    path: '**',
    redirectTo: 'bienvenido',
    pathMatch: 'full',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
