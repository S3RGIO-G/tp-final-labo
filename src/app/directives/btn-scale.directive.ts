import { Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appBtnScale]',
  standalone: true
})
export class BtnScaleDirective {
  @Input() scale : number = 1.1;
  constructor(private el : ElementRef) { }

  @HostListener('mouseenter') onMouseEnter(){   
    this.el.nativeElement.style.transform = `scale(${this.scale})`;
    this.el.nativeElement.style.boxShadow = '0px 5px 10px #777'
  }

  @HostListener('mouseleave') onMouseLeave(){   
    this.el.nativeElement.style.transform = '';
    this.el.nativeElement.style.boxShadow = ''
  }
}
