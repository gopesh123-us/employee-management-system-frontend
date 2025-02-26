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

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getEmployeesList().subscribe((data) => {
      this.employees = data;
    });
  }
}
