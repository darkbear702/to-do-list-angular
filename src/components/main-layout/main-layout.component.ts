import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'k-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent { }
