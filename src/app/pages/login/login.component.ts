import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { FormInputComponent } from 'src/app/components/form-input/form-input.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ModalUsersComponent } from 'src/app/components/modal-users/modal-users.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { User } from '@angular/fire/auth';
import { Administrador } from 'src/app/interfaces/administrador';
import { Paciente } from 'src/app/interfaces/paciente';
import { Especialista } from 'src/app/interfaces/especialista';
import { ToastrService } from 'ngx-toastr';
import { FabbtnUsersComponent } from 'src/app/components/fabbtn-users/fabbtn-users.component';
import { HorarioService } from 'src/app/services/horario.service';
import { NgxCaptchaModule } from 'ngx-captcha';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { slider } from 'src/app/animations/route-animations';
import { FabbtnAccountsComponent } from 'src/app/components/fabbtn-accounts/fabbtn-accounts.component';
import { BtnScaleDirective } from 'src/app/directives/btn-scale.directive';
import { LogService } from 'src/app/services/log.service';

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
    FabbtnAccountsComponent,
    NgxCaptchaModule,
    BtnScaleDirective,
  ],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  showAlert: boolean = false;
  showUsersModal: boolean = false;
  formLog: FormGroup;
  textError?: string;
  user!: any;
  key = '6LfYVrUmAAAAAA3FXerOH3cGzdfxLANSpXtyWf5I';
  @ViewChild('main') main!: ElementRef;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private horarioService: HorarioService,
    private logService: LogService
  ) {
    this.formLog = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      showPassword: new FormControl(),
      captcha: new FormControl(null, [Validators.required]),
    });
  }
  ngOnInit(): void {}

  onSubmit() {
    if (!this.captcha.valid) {
      this.toastr.error('Por favor, complete el captcha', 'Error');
      return;
    }

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
      const currentUser = res.data() as any;
      if (currentUser.type > 1 && !user.emailVerified) {
        this.toastr.error('Debes verificar tu email', 'Error de verificación');
      } else if (currentUser.type === 2 && !currentUser.valid) {
        this.toastr.error(
          'Un Administrador debe habilitar tu cuenta',
          'Sin autorización'
        );
      } else {
        if (currentUser.type > 1 && !currentUser.emailVerified) {
          this.userService.updateUser({ ...currentUser, emailVerified: true });

          if (currentUser.type === 2) {
            this.horarioService.addHorarioDefault(
              currentUser.id,
              currentUser.especialidad
            );
          }
        }

        this.logService.addLogFromUser({ ...currentUser, id: user.uid });
        this.userService.setCurrentUser({ ...currentUser, id: user.uid } as
          | Administrador
          | Paciente
          | Especialista);
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
  get captcha() {
    return this.formLog.controls['captcha'];
  }

  ngOnDestroy() {
    this.main.nativeElement.classList.add('main-close');
  }
}
