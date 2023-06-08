import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  standalone:true,
  imports:[
    CommonModule
  ]
})
export class AlertComponent  implements OnInit {
  @Input() text : string = 'Error';
  @Output() hideAlertEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {    
  }

  onClick(){
    this.hideAlertEvent.emit(false);
  }

}
