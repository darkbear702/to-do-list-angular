import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'k-not-found',
  standalone: true,
  templateUrl: './not-found.component.html',
  imports: [
    ButtonModule,
    RouterLink,
    TranslatePipe,
  ],
})
export class NotFoundComponent { }
