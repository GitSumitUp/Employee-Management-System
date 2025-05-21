import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DepartmentService {

  private baseUrlDepartment = 'http://localhost:8080/api/department';
  private baseUrlEmployee = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) {}

  createDepartment(department: any): Observable<any>{
    return this.http.post<any>(this.baseUrlDepartment, department);
  }
  
  getAllDepartments(): Observable<any>{
    return this.http.get<any[]>(this.baseUrlDepartment);
  }

  getAllEmployees(): Observable<any>{
    return this.http.get<any[]>(this.baseUrlEmployee);
  }



//   updateDepartment(id: number, employee: any): Observable<any> {
//     return this.http.put(`${this.baseUrlDepartment}/${id}`, employee);
//   }

  deleteDepartment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrlDepartment}/${id}`, {responseType : 'text'});
 }
}





