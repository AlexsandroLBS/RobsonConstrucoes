import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent implements OnInit{

  employeeExists: boolean = false;
  offcanvasEnabled: boolean = true;
  codEmployee: number  = 0;
  nome: string = "";
  selectedRole: number = -1;


  @Output() reloadData: EventEmitter<any> = new EventEmitter();
  @Input() roles: any;
  constructor (private employeeService: EmployeeService){

  }
  ngOnInit(): void {
    const modal = document.getElementById('modal')
    modal!.addEventListener('hidden.bs.modal', () => {
      this.reloadTable();
    })
  }


  verifyExists(codigo: number){
    this.employeeService.getEmployeeExists(codigo).subscribe(data => {
      if (Array.isArray(data) && data.length > 0) {
        const exists = data[0];
        this.employeeExists = exists;
      } else {
        this.employeeExists = false;
      }
    })
  }


  public reloadTable(){
    this.reloadData.emit(true);
  }


  public clearData(){
    this.codEmployee = 0;
    this.nome = "";
    this.selectedRole = -1;
  }

  public save(){
    this.employeeService.createNewEmployee({codigo: this.codEmployee,
      nome: this.nome,
      codigo_cargo: this.selectedRole}).subscribe((data) => {
        this.reloadTable();
        this.clearData();
    })
  }
}
