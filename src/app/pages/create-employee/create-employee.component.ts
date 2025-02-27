import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { EmployeeService } from '../../shared/services/employee.service';
import { Employee } from '../../shared/models/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.css',
})
export class CreateEmployeeComponent {
  newEmployee: Employee = new Employee();

  employeeForm: FormGroup;
  constructor(private employeeService: EmployeeService, private router: Router) {
    this.employeeForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  onSubmit() {
    if (this.employeeForm.valid) {
      this.newEmployee = this.employeeForm.value;
      this.saveEmployee();
    } else {
      console.log('Form is invalid');
    }
  }
  saveEmployee() {
    this.employeeService.saveEmployee(this.newEmployee).subscribe({
      next: (response) => {
        console.log('Entity saved successfully', response), this.employeeForm.reset();
        this.router.navigate(['/employeelist']);
      },
      error: (error) => console.error('Error saving entity', error),
    });
  }
}
