import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Turno } from 'src/app/interfaces/turno';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TurnoService } from 'src/app/services/turno.service';
import { FormInputComponent } from '../form-input/form-input.component';

@Component({
  selector: 'app-modal-motivos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormInputComponent],
  templateUrl: './modal-motivos.component.html',
  styleUrls: ['./modal-motivos.component.scss']
})
export class ModalMotivosComponent {
  @Input() showModal!: boolean;
  @Input() turno!: Turno;
  @Output() closeModalEvent = new EventEmitter<boolean>();
  @Output() loadingEvent = new EventEmitter<boolean>();

  form: FormGroup;

  constructor(private turnoService: TurnoService) {
    this.form = new FormGroup({
      motivo: new FormControl(),
    });
  }

  OnSubmit() {
    if(!this.motivo.value) this.motivo.setErrors({motivo:true})

    if(this.form.invalid) return;
    this.turno.motivo = this.motivo.value;
    this.closeModalEvent.emit(false);
    this.loadingEvent.emit(true);
    this.turnoService.updateTurnoById(this.turno).then(res=>{
      this.loadingEvent.emit(false);
      this.form.reset();
    })
  }

  cancel() {
    this.form.reset();
    this.closeModalEvent.emit(false);
  }

  get motivo(){
    return this.form.controls['motivo'];
  }
}
