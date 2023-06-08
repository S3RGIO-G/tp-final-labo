import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-custom',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-custom.component.html',
  styleUrls: ['./modal-custom.component.scss']
})
export class ModalCustomComponent implements OnInit{
  @Input() showModal!: boolean;
  @Input() class !: string;
  @Input() closeBtn !: boolean;
  @Output() hideModalEvent = new EventEmitter<boolean>();
  constructor() {}
  ngOnInit(): void {}
}
