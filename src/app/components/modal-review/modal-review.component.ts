import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Turno } from 'src/app/interfaces/turno';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TurnoService } from 'src/app/services/turno.service';
import { FormInputComponent } from '../form-input/form-input.component';

@Component({
  selector: 'app-modal-review',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormInputComponent],
  templateUrl: './modal-review.component.html',
  styleUrls: ['./modal-review.component.scss'],
})
export class ModalReviewComponent {
  @Input() showModal!: boolean;
  @Input() turno!: Turno;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  @Output() loadingEvent = new EventEmitter<boolean>();

  form: FormGroup;

  constructor(private turnoService: TurnoService) {
    this.form = new FormGroup({
      comentario: new FormControl(),
      puntuacion: new FormControl(),
    });
  }

  OnSubmit() {
    if(!this.comentario.value) this.comentario.setErrors({comentario:true})
    if(!this.puntuacion.value) this.puntuacion.setErrors({puntuacion:true})

    if(this.form.invalid) return;
    this.turno.review ={
      comentario: this.comentario.value,
      puntuacion: parseInt(this.puntuacion.value),
    }
    this.closeModalEvent.emit(false);
    this.loadingEvent.emit(true);
    this.turnoService.updateTurnoById(this.turno).then(res=>{
      this.loadingEvent.emit(false);
    })
  }

  cancel() {
    this.form.reset();
    this.closeModalEvent.emit(false);
  }

  get comentario(){
    return this.form.controls['comentario'];
  }
  get puntuacion(){
    return this.form.controls['puntuacion'];
  }
}
