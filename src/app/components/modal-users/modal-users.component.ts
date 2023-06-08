import { CommonModule } from '@angular/common';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-users',
  templateUrl: './modal-users.component.html',
  styleUrls: ['./modal-users.component.scss'],
  standalone:true,
  imports:[
    CommonModule
  ]
})
export class ModalUsersComponent  implements OnInit {

  @Input() showUsersModal : boolean = false;
  @Output() hideModalEvent = new EventEmitter<boolean>();
  @Output() userSelectedEvent = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {}

  backClick(value: any){
    if(value.target.classList.contains('modal-background')) this.hideModalEvent.emit(false);
  }

  userSelected(e : any, password : string){
    let email = e.target.textContent;
    this.userSelectedEvent.emit({email: email, password: password})
    this.hideModalEvent.emit(false);
  }

}
