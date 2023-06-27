import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  AfterContentInit,
} from '@angular/core';

@Directive({
  selector: '[appTurnoState]',
  standalone: true,
})
export class TurnoStateDirective {
  @Input() text!: string;
  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    switch (this.text) {
      case 'libre':
        this.elRef.nativeElement.style.color = '#5188FF';
        break;
      case 'pendiente':
        this.elRef.nativeElement.style.color = 'orange';
        break;
      case 'aceptado':
        this.elRef.nativeElement.style.color = '#24c97c';
        break;
      case 'realizado':
        this.elRef.nativeElement.style.color = 'yellow';
        break;
      default:
        this.elRef.nativeElement.style.color = 'red';
    }
  }

  @HostListener('mouseenter') onMouseEnter(){
    this.elRef.nativeElement.style.transform = 'scale(1.3)';
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.elRef.nativeElement.style.transform = 'scale(1)';
  }
}
