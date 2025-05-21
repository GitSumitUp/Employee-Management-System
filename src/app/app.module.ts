
import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { EmployeeService } from './employee.service';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { IftaLabelModule } from 'primeng/iftalabel';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DepartmentComponent } from './department/department.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    DepartmentComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    DatePickerModule,
    FormsModule,
    HttpClientModule,
    IftaLabelModule,
    TableModule,  
    ButtonModule
  ],
  
  providers: [
    EmployeeService,
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
