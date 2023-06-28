import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTurnoHistorial]',
  standalone: true
})
export class TurnoHistorialDirective {
  @Input() number !: number;
  @Input() text!: 'temp' | 'pres';
  constructor(private el: ElementRef) {}

  ngOnInit(){
    const styles = this.el.nativeElement.style;
    if(this.text === 'temp'){
      if(this.number > 39)
      styles.color= 'red';
      else if(this.number > 37)
      styles.color = 'yellow';
      else if(this.number > 35)
      styles.color = '#24c97c';
      else
      styles.color = '#0f0fff';
    }
    else if(this.text === 'pres'){
      if(this.number > 85)
      styles.color= 'red';
      else if(this.number < 60)
      styles.color = 'orange';
      else
      styles.color = '#24c97c';
    }
  }
}
