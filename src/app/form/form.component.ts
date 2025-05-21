import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  standalone: false,
})

export class FormComponent implements OnInit {
  employee = {
    fname: '',
    lname: '',
    password: '',
    email: '',
    department: {
       departmentid: 0
    },
    doj: '',
    gender: '',
    active: false 
  };

  submitted = false;
  showEmployeeList = false; 
  
  employeeList: any[] = [];
  departmentList: any[] = [];

  selectedEmployeeForEdit: any = null;
  isEditing = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    const today = new Date();
    this.employee.doj = today.toISOString().substring(0, 10);
    this.getEmployees();
    this.employeeService.getDepartments().subscribe((res)=>
    {
      this.departmentList=res;
    })
  }
  

  onSubmit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      console.log('Employee Payload:', this.employee);
      const apiCall = this.isEditing
        ? this.employeeService.updateEmployee(this.selectedEmployeeForEdit.id, this.employee)
        : this.employeeService.createEmployee(this.employee);

      apiCall.subscribe({
        next: res => {
          console.log(`Employee ${this.isEditing ? 'updated' : 'registered'} successfully`, res);
          alert(`Employee ${this.isEditing ? 'updated' : 'registered'} successfully!`);
          this.onReset(form);
          this.getEmployees();
          this.isEditing = false;
          this.selectedEmployeeForEdit = null;
        },
        error: (err: any) => {
          console.error(`Error ${this.isEditing ? 'updating' : 'saving'} employee`, err);
          if (err.status === 409) {
            alert('This email address is already registered.');
          } else {
            alert(`Error occurred while ${this.isEditing ? 'updating' : 'registering'} employee.`);
          }
        }
      });
    }
  }



  onEdit(employee: any){
    this.isEditing = true;
    this.selectedEmployeeForEdit = { ...employee};
    this.employee = { ...employee }; // Populate the form
  }

  

  onDelete(id: number){
     if(confirm('Are you sure you want to delete this employee?')){
      this.employeeService.deleteEmployee(id).subscribe({
        next: res => {
          console.log('Employee deleted successfully', res);
          alert('Employee deleted successfully!');
          this.getEmployees();
        },
        error: err => {
          console.error('Error deleting employee', err);
          alert('Error occurred while deleting employee.');
        }
      });
    }
  }


  getEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (data: any) => {
        this.employeeList = data;
        console.log("employeeList: ",this.employeeList);
        
      },
      error: err => {
        console.error('Error fetching employees', err);
      }
    });
  }

  onReset(form: NgForm) {
     form.resetForm();
    this.submitted = false;
    this.isEditing = false;
    this.selectedEmployeeForEdit = null;
     this.employee = {
      fname: '',
      lname: '',
      password: '',
      email: '',
      department: {
        departmentid: 0
      },
      doj: '',
      gender: '',
      active: false
    };
    const today = new Date();
    this.employee.doj = today.toISOString().substring(0, 10);
  }
}