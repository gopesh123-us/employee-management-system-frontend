import { Component } from '@angular/core';
import { LayoutComponent } from './layouts/layout/layout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [LayoutComponent],
})
export class AppComponent {
  title = 'employee-management-system-frontend';
}
