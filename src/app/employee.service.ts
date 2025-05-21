import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class EmployeeService {
  private baseUrl = 'http://localhost:8080/api/employees';
  private baseUrlDepartment = 'http://localhost:8080/api/department';

  constructor(private http: HttpClient) {}

  createEmployee(employee: any): Observable<any>{
    return this.http.post<any>(this.baseUrl, employee);
  }
  
  getDepartments():Observable<any>{
    return this.http.get<any[]>(this.baseUrlDepartment);
  }

  getAllEmployees(): Observable<any[]> {
     return this.http.get<any[]>(this.baseUrl);
   }

  // getEmployeeById(id: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/${id}`);
  // }

  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType : 'text'});
 }
}



