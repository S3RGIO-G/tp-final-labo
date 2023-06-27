import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fabbtn-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fabbtn-accounts.component.html',
  styleUrls: ['./fabbtn-accounts.component.scss']
})
export class FabbtnAccountsComponent {
  open = false;
  times: NodeJS.Timeout[] = [];
  @Output() SelectUserEvent = new EventEmitter<{
    email: string;
    password: string;
  }>();

  users = [
    {
      img: 'https://firebasestorage.googleapis.com/v0/b/tp-final-labo.appspot.com/o/images%2F1fXHlhcLPHOEpDwpqN6fFuIaowk2%2Fadmin.png?alt=media&token=e1fb2cf8-8f13-4f94-89a7-67bfa07c3689',
      email: 'admin@gmail.com',
      password: 'Admin123456',
    },
    {
      img: 'https://firebasestorage.googleapis.com/v0/b/tp-final-labo.appspot.com/o/images%2FHfGtwGx98dYUnRmrpN5kQ5r5sYT2%2Fdoctor.png?alt=media&token=64a7c82e-27b2-479d-b4e7-088e7602603f',
      email: 'licefad811@bodeem.com',
      password: 'Prueba1234',
    },
    {
      img: 'https://firebasestorage.googleapis.com/v0/b/tp-final-labo.appspot.com/o/images%2FnvcdlCcES5S9OlmiPKx1GucTleW2%2Fdoctor.png?alt=media&token=cc0fd0cf-c54b-4b5a-b1ef-dc023263b185',
      email: 'moxihi3060@aramask.com',
      password: 'Prueba1234',
    },
    {
      img: 'https://firebasestorage.googleapis.com/v0/b/tp-final-labo.appspot.com/o/images%2Fs2lnp8vluXdSe3DwCNSiBiGOvoq1%2Fpacient.png?alt=media&token=c965ff3f-e576-4764-b31f-65418f773877',
      email: 'rigoh20311@camplvad.com',
      password: 'Prueba1234',
    },
    {
      img: 'https://firebasestorage.googleapis.com/v0/b/tp-final-labo.appspot.com/o/images%2FtUPrKFjuzWQ61I9PQaWclxOG25Q2%2Fpacient.png?alt=media&token=4621bf05-e09a-4244-a135-a0d6814903a4',
      email: 'kedig17857@camplvad.com',
      password: 'Prueba1234',
    },
    {
      img: 'https://firebasestorage.googleapis.com/v0/b/tp-final-labo.appspot.com/o/images%2FSMLsJs15g3eqpuN3TXHx73TtTCD3%2Fpacient.png?alt=media&token=5d1b2314-b5dd-4b91-a932-578e8ae4ef41',
      email: 'vayilox419@bodeem.com',
      password: 'Prueba1234',
    },
  ];

  toggleBtn(user: { email: string; password: string } | null) {
    this.open = !this.open;
    const items = document.querySelectorAll('.btn-opt');
    if (user) this.SelectUserEvent.emit({ ...user });
    if (this.times.length > 0) this.times.forEach((t) => clearTimeout(t));
    this.open ? this.show(items) : this.close(items);
  }

  show(items: NodeListOf<Element>) {
    let px = 70;
    items.forEach((item, i) => {
      const t = setTimeout(() => {
        item.setAttribute('style', `bottom:${px}px`);
        px += 55;
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
