import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatSelect,
  MatSelectTrigger,
  MatSelectModule,
} from '@angular/material/select';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormInputComponent } from '../form-input/form-input.component';
import { Control } from 'src/app/interfaces/control';
import { Turno } from 'src/app/interfaces/turno';

@Component({
  selector: 'app-modal-control',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormInputComponent,
  ],
  templateUrl: './modal-control.component.html',
  styleUrls: ['./modal-control.component.scss'],
})
export class ModalControlComponent {
  @Input() showModal!: boolean;
  @Output() hideModal = new EventEmitter<boolean>();
  @Output() controlData = new EventEmitter<Control>();
  tags: string[] = ['caries', 'anteojos', 'glucosa', 'glob. rojos'];
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      altura: new FormControl(null, [Validators.min(0)]),
      peso: new FormControl(null, [Validators.min(0)]),
      temperatura: new FormControl(null, [Validators.min(0)]),
      presion: new FormControl(null, [Validators.min(0)]),
      dinamicos: new FormControl(null, [Validators.maxLength(3)]),
    });
  }

  dinamicosChange(event: string[]) {
    const diff = this.tags.filter((i) => event.indexOf(i) === -1);
    diff.forEach((i) => this.form.removeControl(i));
    event.forEach((i) => {
      if (!this.form.controls[i]) {
        if (i !== 'anteojos')
          this.form.addControl(i, new FormControl(null, [Validators.min(0)]));
        else this.form.addControl(i, new FormControl(null));
      }
    });
  }

  OnSubmit() {
    this.verify();

    if (!this.form.valid) return;

    const control: Control = {
      altura: parseInt(this.altura.value),
      peso: parseInt(this.peso.value),
      temperatura: parseInt(this.temperatura.value),
      presion: parseInt(this.presion.value),
      dinamico: null,
    };

    if (this.dinamicos.value) {
      const dinamicos: any = [];
      this.dinamicos.value.forEach((i: any) => {
        let value: number | boolean = false;
        if (i === 'anteojos') value = Boolean(this.form.controls[i].value);
        else value = parseInt(this.form.controls[i].value);
        dinamicos.push({ clave: i, valor: value });
      });
      control.dinamico = dinamicos;
    }
    this.controlData.emit(control);
    this.hideModal.emit(false);
  }

  cancel() {
    this.form.reset();
    this.hideModal.emit(false);
  }

  verify() {
    if (!this.altura.value) this.altura.setErrors({ altura: true });
    if (!this.peso.value) this.peso.setErrors({ peso: true });
    if (!this.temperatura.value)
      this.temperatura.setErrors({ temperatura: true });
    if (!this.presion.value) this.presion.setErrors({ presion: true });
    if (this.dinamicos.value) {
      this.dinamicos.value.forEach((i: any) => {
        const control = this.form.controls[i];
        if (!control.value && control.value === null) control.setErrors({ i: true });
      });
    }
  }

  get altura() {
    return this.form.controls['altura'];
  }
  get peso() {
    return this.form.controls['peso'];
  }
  get temperatura() {
    return this.form.controls['temperatura'];
  }
  get presion() {
    return this.form.controls['presion'];
  }
  get dinamicos() {
    return this.form.controls['dinamicos'];
  }
}
