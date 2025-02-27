import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../../shared/models/employee';
import { EmployeeService } from '../../shared/services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  page = 0;
  size = 10;
  sortBy = 'firstName';
  direction = 'asc';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees(): void {
    console.log('page called: ' + this.page);
    this.employeeService.getEmployeesList(this.page, this.size, this.sortBy, this.direction).subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => console.log('Error getting employee list: ', error)
    );
  }

  changePage(newPage: number) {
    this.page = newPage;
    this.getEmployees();
  }

  changeSorting(sortby: string, direction: string) {
    this.sortBy = sortby;
    this.direction = direction;
    this.getEmployees();
  }
}
