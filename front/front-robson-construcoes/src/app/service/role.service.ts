import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }


  public getAllRoles(){
    return this.httpClient.get(`${environment.apiUrl}/roles/getRoles`);
  }

  public createNewRole( salario : number){
    return this.httpClient.post(`${environment.apiUrl}/roles/new`, {salario: salario});
  }
}
