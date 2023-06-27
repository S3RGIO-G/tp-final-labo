import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPressEfect]',
  standalone: true,
})
export class PressEfectDirective {
  @Input() scale : number = 0.9;
  @Input() group : string = '.btn-option';

  constructor(private el: ElementRef) {}

  @HostListener('click') onClick() {
    const el = this.el.nativeElement;
    const test = document.querySelectorAll(this.group);
    test.forEach((e) => e.removeAttribute('style'));
    el.style.transform = `scale(${this.scale})`;
  }

}
