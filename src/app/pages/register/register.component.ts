import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from 'src/app/components/form-input/form-input.component';
import { AlertComponent } from 'src/app/components/alert/alert.component';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';
import { FormValidator } from 'src/app/validators/forms.validator';
import { Administrador } from 'src/app/interfaces/administrador';
import { Especialista } from 'src/app/interfaces/especialista';
import { Paciente } from 'src/app/interfaces/paciente';
import { ModalCustomComponent } from 'src/app/components/modal-custom/modal-custom.component';
import { ImageService } from 'src/app/services/image.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '@angular/fire/auth';
import { Especialidad } from 'src/app/interfaces/especialidad';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    CommonModule,
    FormInputComponent,
    AlertComponent,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SpinnerComponent,
    ModalCustomComponent,
  ],
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  showAlert: boolean = false;
  showModal: boolean = false;
  textError?: string;
  formReg: FormGroup;
  formEsp: FormGroup;
  user!: Administrador | Especialista | Paciente | null;
  especialidades!: Array<Especialidad>;
  imgUploaded !: File[];

  constructor(
    private userService: UserService,
    private router: Router,
    private imgService: ImageService,
    private toastr: ToastrService,
  ) {
    this.formReg = new FormGroup({
      type: new FormControl(null),
      name: new FormControl('', [FormValidator.onlyLetters]),
      lastName: new FormControl('', [FormValidator.onlyLetters]),
      dni: new FormControl(null, [
        Validators.maxLength(8),
        Validators.minLength(8),
        FormValidator.onlyNumbers,
      ]),
      age: new FormControl('', [
        Validators.min(18),
        Validators.max(65),
        FormValidator.onlyNumbers,
      ]),
      email: new FormControl('', [FormValidator.email]),
      password: new FormControl('', [
        FormValidator.password,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [FormValidator.confirmPassword]),
      images: new FormControl(),
      showPassword: new FormControl(),
    });

    this.formEsp = new FormGroup({
      espName: new FormControl('', [FormValidator.onlyLetters]),
    });
  }
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
    this.userService.getCurrentUserObs().subscribe(res=>{
      this.user = res[0];
    })
    this.userService.getSpecialties().subscribe((res) => {
      this.especialidades = res;
    });
  }

  async onSubmit() {
    this.verifyValues();
    if (this.formReg.invalid) return;
    this.loading = true;
    this.userService
      .register(this.formReg.value)
      .then((res) => {
        this.addToFirestore(res.user);
      })
      .catch((err) => {
        this.showAlert = true;
        this.loading = false;
        this.textError = 'Error, no se pudo registrar al usuario';
        if (err.code === 'auth/email-already-in-use')
          this.textError = 'El correo ya se encuentra en uso';
        if (err.code === 'auth/network-request-failed')
          this.textError = 'Se perdió la conexion a internet';
      });
  }

  async addToFirestore(user: User) {
    const imgURLs = [];
    for (let i = 0; i < this.imgUploaded.length; i++) {
      const url = await this.imgService.addImage(this.imgUploaded[i], user.uid);
      imgURLs.push(url);
      if (i === this.imgUploaded.length - 1) {
        this.userService
          .addUserById({ ...this.formReg.value, imgURLs }, user.uid)
          .then((res) => {
            this.postAddToFirestore(user);
          });
      }
    }
  }

  postAddToFirestore(user: User) {
    if (this.type.value === 2 || this.type.value === 3) {
      this.toastr.info(
        'Le enviamos un correo para su verificacion',
        'Verificar Email'
      );
      this.userService.sendEmailVerification(user);
    } else {
      this.toastr.success('El usuario se creó exitosamente', 'Usuario creado');
    }
    this.formReg.reset();
    this.loading = false;
    this.router.navigate(['/bienvenido']);
  }

  selectTypeUser(event: any, type : number) {
    this.images.reset();
    const btn = (event.target.type === 'button') ? event.target : event.target.parentElement;
    const buttons = document.querySelectorAll('.btn-user');
    buttons.forEach(btn =>{
      btn.classList.remove('btn-selected');
    })
    btn.classList.add('btn-selected');
    switch (type) {
      case 1:
        this.type.setValue(1);
        break;
      case 2:
        this.type.setValue(2);
        this.formReg.addControl('especialidad', new FormControl());
        if (this.formReg.controls['obraSocial'])
          this.formReg.removeControl('obraSocial');
        break;
      case 3:
        this.type.setValue(3);
        this.formReg.addControl(
          'obraSocial',
          new FormControl('', FormValidator.obraSocial)
        );
        if (this.formReg.controls['especialidad'])
          this.formReg.removeControl('especialidad');
        break;
    }
  }

  selectImages(event: any) {
    this.imgUploaded = event.target.files;
    console.log(this.imgUploaded);
    if (this.imgUploaded.length !== 2 && this.type.value === 2 || this.imgUploaded.length !== 1 && this.type.value !== 2 ) {
      this.images.setErrors({ images: true });
      return;
    }
  }

  createSpecialty() {
    this.loading = true;
    this.userService.addSpecialty({ name: this.espName.value }).then((res) => {
      console.log(res);
      this.showModal = false;
      this.loading = false;
      this.formEsp.reset();
    });
  }

  cancelSpecialtyCreation() {
    this.showModal = false;
    this.formEsp.reset();
  }

  verifyValues() {
    if (!this.email.value) this.email.setErrors({ email: true });
    if (!this.password.value) this.password.setErrors({ password: true });
    if (!this.confirmPassword.value)
      this.confirmPassword.setErrors({ confirmPassword: true });
    if (!this.type.value) this.type.setErrors({ type: true });
    if (!this.name.value) this.name.setErrors({ name: true });
    if (!this.lastName.value) this.lastName.setErrors({ lastName: true });
    if (!this.dni.value) this.dni.setErrors({ dni: true });
    if (!this.age.value) this.age.setErrors({ age: true });
    if (this.obraSocial && !this.obraSocial.value)
      this.obraSocial.setErrors({ obraSocial: true });
    if (this.especialidad && !this.especialidad.value)
      this.especialidad.setErrors({ especialidad: true });
    if (!this.images.value) this.images.setErrors({ images: true });
  }

  get type() {
    return this.formReg.controls['type'];
  }
  get name() {
    return this.formReg.controls['name'];
  }
  get lastName() {
    return this.formReg.controls['lastName'];
  }
  get dni() {
    return this.formReg.controls['dni'];
  }
  get age() {
    return this.formReg.controls['age'];
  }
  get obraSocial() {
    return this.formReg.controls['obraSocial'];
  }
  get especialidad() {
    return this.formReg.controls['especialidad'];
  }
  get email() {
    return this.formReg.controls['email'];
  }
  get password() {
    return this.formReg.controls['password'];
  }
  get confirmPassword() {
    return this.formReg.controls['confirmPassword'];
  }
  get images() {
    return this.formReg.controls['images'];
  }
  get showPassword() {
    return this.formReg.controls['showPassword'];
  }
  get espName() {
    return this.formEsp.controls['espName'];
  }
}
