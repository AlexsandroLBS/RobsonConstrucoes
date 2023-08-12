import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }

  public getEmployeeExists(codigo: number){
    return this.httpClient.get(`${environment.apiUrl}/employee/exists?codigo=${codigo}`)
  }
  public getAllEmployees(){
    return this.httpClient.get(`${environment.apiUrl}/employee/getAll`);
  }

  public createNewEmployee( employee: Employee){
    return this.httpClient.post(`${environment.apiUrl}/employee/new`, employee );
  }

  public deleteEmployee(codigo: number){
    return this.httpClient.delete(`${environment.apiUrl}/employee/delete?employee_id=${codigo}`);
  }
}
