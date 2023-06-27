import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Paciente } from 'src/app/interfaces/paciente';
import { Administrador } from 'src/app/interfaces/administrador';
import { Especialista } from 'src/app/interfaces/especialista';

@Component({
  selector: 'app-fabbtn-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fabbtn-users.component.html',
  styleUrls: ['./fabbtn-users.component.scss'],
})
export class FabbtnUsersComponent {
  open: boolean = false;
  times: NodeJS.Timeout[] = [];
  @Output() SelectUserEvent = new EventEmitter<
    Paciente | Administrador | Especialista
  >();
  @Input() users!: Administrador[] | Paciente[] | Especialista[];
  @Input() icon!: string;

  ngOnInit() {
    window.addEventListener('click', (e) => {
      const target: any = e.target;
      const classList = target.classList;
      if ( this.open &&
        !classList.contains('fabs') &&
        !classList.contains('action') &&
        !classList.contains('btn-opt') &&
        !classList.contains('icon') &&
        !classList.contains('btn-name') &&
        !classList.contains('btn-img')
      ) {
        this.toggleBtn(null);
      }
    });
  }
  toggleBtn(user: Paciente | Administrador | Especialista | null) {
    this.open = !this.open;
    const items = document.querySelectorAll('.btn-opt');
    if (user) this.SelectUserEvent.emit(user);
    if (this.times.length > 0) this.times.forEach((t) => clearTimeout(t));
    this.open ? this.show(items) : this.close(items);
  }

  show(items: NodeListOf<Element>) {
    let px = 95;
    items.forEach((item, i) => {
      const t = setTimeout(() => {
        item.setAttribute('style', `bottom:${px}px`);
        px += 90;
      }, 50 * i);
      this.times.push(t);
    });
  }

  close(items: NodeListOf<Element>) {
    let x = 1;
    for (let i = items.length - 1; i > -1; i--) {
      const item = items[i];
      const t = setTimeout(() => {
        item.removeAttribute('style');
      }, 50 * x);
      this.times.push(t);
      x++;
    }
  }
}
