import { Routes } from '@angular/router';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';

export const routes: Routes = [
  {
    path: 'employeelist',
    loadComponent: () =>
      import('./pages/employee-list/employee-list.component').then(
        (m) => m.EmployeeListComponent
      ),
  },
  {
    path: 'addemployee',
    loadComponent: () =>
      import('./pages/create-employee/create-employee.component').then(
        (m) => m.CreateEmployeeComponent
      ),
  },
  {
    path: '**',
    redirectTo: '/employeelist',
    pathMatch: 'full',
  },
];
