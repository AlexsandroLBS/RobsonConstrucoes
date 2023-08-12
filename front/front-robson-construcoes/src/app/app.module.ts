import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MenuComponent } from './pages/menu/menu.component';
import { NewRoleComponent } from './pages/new-role/new-role.component';
import { NewEmployeeComponent } from './pages/new-employee/new-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NewRoleComponent,
    NewEmployeeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
