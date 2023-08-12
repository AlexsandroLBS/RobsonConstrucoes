import { Component, OnInit } from '@angular/core';
import { EmployeeLWithSalary } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/service/employee.service';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{

  public filteredData: EmployeeLWithSalary[] = [];
  public employeeList: EmployeeLWithSalary[] = [];
  public roles: any = [];
  public salarySum: string = "";


  constructor(private employeeService: EmployeeService, private roleService: RoleService) {

  }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe((data: any) => {
      this.employeeList = data.data
      this.showData("")
      }
    )

    this.roleService.getAllRoles().subscribe((data:any) =>{

      this.roles = data.data
      console.log(this.roles);
    }
    )
  }


  deleteEmployee(codigo: number){
    this.employeeService.deleteEmployee(codigo).subscribe();
    this.reloadTable(true);
  }

  showData(selectedValue: any) {
    if (selectedValue == "") {
      this.filteredData = this.employeeList;
      this.salarySum = this.calculateTotalSalary(this.filteredData);
    }
    else if (selectedValue.value == "") {
      this.filteredData = this.employeeList;
      this.salarySum = this.calculateTotalSalary(this.filteredData);
    }
    else {
      this.filteredData = this.employeeList.filter(x => x.cargo == selectedValue.value);
      this.salarySum = this.calculateTotalSalary(this.filteredData);
    }
  }

  private calculateTotalSalary(data: EmployeeLWithSalary[]): string {
    const totalSalary = data.reduce((total, employee) => total + employee.salario, 0);
    return totalSalary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }


  public reloadTable(event: any){
    if(event){
      this.ngOnInit()
    }
  }
}
