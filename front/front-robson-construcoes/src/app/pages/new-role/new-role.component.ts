import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RoleService } from 'src/app/service/role.service';

@Component({
  selector: 'app-new-role',
  templateUrl: './new-role.component.html',
  styleUrls: ['./new-role.component.scss']
})
export class NewRoleComponent implements OnInit{

  public salario: number = 0
  @Output() reloadData: EventEmitter<any> = new EventEmitter();

  constructor(private roleService: RoleService){

  }

  ngOnInit(): void {
  }


  public reloadTable(){
    this.reloadData.emit(true);
  }

 

  public save(){
    this.roleService.createNewRole(this.salario).subscribe(data => {
      this.reloadTable();
    })
  }

}
