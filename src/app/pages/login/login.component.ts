import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { FormInputComponent } from 'src/app/components/form-input/form-input.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ModalUsersComponent } from 'src/app/components/modal-users/modal-users.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { User } from '@angular/fire/auth';
import { Administrador } from 'src/app/interfaces/administrador';
import { Paciente } from 'src/app/interfaces/paciente';
import { Especialista } from 'src/app/interfaces/especialista';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormInputComponent,
    AlertComponent,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ModalUsersComponent,
    SpinnerComponent,
  ],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  showAlert: boolean = false;
  showUsersModal: boolean = false;
  formLog: FormGroup;
  textError?: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.formLog = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      showPassword: new FormControl(),
    });
  }
  ngOnInit(): void {}

  onSubmit() {
    this.loading = true;
    this.showAlert = false;
    this.userService
      .login(this.formLog.value)
      .then((res) => {
        this.searchIntoFirestore(res.user);
      })
      .catch((err) => {
        this.loading = false;
        this.toastr.error(this.firebaseError(err.code), 'Error');
      });
  }

  searchIntoFirestore(user: User) {
    this.userService.getUserById(user.uid).then((res) => {
      const currentUser = res.data();
      if (currentUser?.['type'] > 1 && !user.emailVerified) {
        this.toastr.error('Debes verificar tu email', 'Error de verificación');
      } else if (currentUser?.['type'] === 2 && !currentUser?.['valid']) {
        this.toastr.error(
          'Un Administrador debe habilitar tu cuenta',
          'Sin autorización'
        );
      } else {
        this.userService.setCurrentUser(
          currentUser as Administrador | Paciente | Especialista
        );
        this.router.navigate(['/bienvenido']);
      }
      this.loading = false;
    });
  }

  firebaseError(code: string) {
    switch (code) {
      case 'auth/missing-email':
        return (this.textError = 'Por favor ingrese un correo electronico');
      case 'auth/missing-password':
        return (this.textError = 'Por favor ingrese una contraseña');
      case 'auth/invalid-email':
        return (this.textError = 'El correo no es valido');
      case 'auth/auth/user-not-found':
        return (this.textError = 'El usuario no esta registrado');
      case 'auth/wrong-password':
        return (this.textError = 'La contraseña no es correcta');
      case 'auth/network-request-failed':
        return (this.textError = 'Se perdió la conexion a internet');
      default:
        return (this.textError = 'Error, algo salio mal');
    }
  }

  userSelected(event: any) {
    this.password.setValue(event.password);
    this.email.setValue(event.email);
  }

  get showPassword() {
    return this.formLog.controls['showPassword'];
  }
  get password() {
    return this.formLog.controls['password'];
  }
  get email() {
    return this.formLog.controls['email'];
  }
}
