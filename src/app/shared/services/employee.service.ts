import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { tap, catchError } from 'rxjs/operators';
import { throwError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8080';
  //private baseUrl = 'http://localhost:3000/findAllEmployees';

  constructor(private http: HttpClient) {}

  getEmployeesList(page: number, size: number, sortby: string, direction: string): Observable<Employee[]> {
    let params = new HttpParams();
    params = params.set('page', page).set('size', size).set('sortby', sortby).set('direction', direction);

    return this.http.get<any>(`${this.baseUrl}/api/v1/entities`, { params });
  }

  saveEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.baseUrl}/api/v1/saveEmployee`, employee);
  }
}
