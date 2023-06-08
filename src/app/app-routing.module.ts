import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: 'register',
    title: 'Crear cuenta',
    loadComponent: () =>
      import('./pages/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'login',
    title: 'Iniciar Sesíon',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'usuarios',
    title: 'Usuarios',
    loadComponent: () =>
      import('./pages/usuarios/usuarios.component').then((m) => m.UsuariosComponent),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
