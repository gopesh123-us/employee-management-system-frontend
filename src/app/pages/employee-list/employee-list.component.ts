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
  pageInfo: any;
  page = 0;
  size = 5;
  sortBy = 'firstName';
  direction = 'asc';
  isLastPage: boolean = false;
  isFirstPage: boolean = false;
  totalPages: number = 0;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees(): void {
    this.employeeService.getEmployeesList(this.page, this.size, this.sortBy, this.direction).subscribe({
      next: (data: any) => {
        this.employees = data.pagedModel.content;
        this.isFirstPage = data.pageMetaData.isFirst;
        this.isLastPage = data.pageMetaData.isLast;
        this.page = parseInt(data.page.number);
        this.totalPages = parseInt(data.page.totalPages);
      },
      error: (error) => {
        console.log('Error getting employee list: ', error);
      },
      complete: () => {
        console.log('Employee list fetch complete');
      },
    });
  }

  getLink(links: any[], rel: string): string | null {
    const linkObj = links.find((link) => link.rel === rel);
    return linkObj ? linkObj.href : null;
  }

  changeSorting(sortby: string, direction: string) {
    this.sortBy = sortby;
    this.direction = direction;
    this.getEmployees();
  }

  nextPage(page: number) {
    if (page <= this.totalPages) {
      this.page = page + 1;
    }

    this.getEmployees();
  }
  previousPage(page: number) {
    if (page > 0) {
      this.page = page - 1;
    }

    this.getEmployees();
  }
}
