import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { SpinnerComponent } from 'src/app/components/spinner/spinner.component';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SpinnerComponent],
})
export class BienvenidoComponent implements OnInit {
  ngOnInit(): void {}
}
