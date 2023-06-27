import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  AfterContentInit,
} from '@angular/core';

@Directive({
  selector: '[appRowTable]',
  standalone: true,
})
export class RowTableDirective {
  @Input() color: string = '#555';
  constructor(private elRef: ElementRef) {}

  ngOnInit() { }

  @HostListener('mouseenter') onMouseEnter(){
    this.elRef.nativeElement.style.backgroundColor = this.color;
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.elRef.nativeElement.style.backgroundColor = '';
  }
}
