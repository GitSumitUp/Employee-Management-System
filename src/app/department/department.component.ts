
import { DepartmentService } from './../department.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-department',
  standalone: false,
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent {
    department = {
     departmentname: '',
     mgr: {
        id: 0
     }
  };


  submitted = false;

  employeeList : any[] = [];

  departmentList: any[] = [];


  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.getDepartment()

       this.departmentService.getAllEmployees().subscribe((res)=>{
       this.employeeList=res;
    })
  }
  

  onSubmit(dept : NgForm) {
    this.submitted = true;

   if (dept.valid) {
      console.log('Department Payload:', this.department);

      this.departmentService.createDepartment(this.department).subscribe({
        next: res => {
          console.log(`Department registered' successfully`, res);
           alert("Submitted Successfully !!!");

          this.onReset(dept);
          this.getDepartment();
          // this.isEditing = false;
          // this.selectedEmployeeForEdit = null;
        },
        error: (err: any) => {
          console.error(`Error in 'saving' department`, err);
        }
      });
    }
  }

  onDelete(id : number){
      if(confirm('Are you sure you want to delete this employee?')){
      this.departmentService.deleteDepartment(id).subscribe({
        next: res => {
          alert('Employee deleted successfully!');
          this.getDepartment();
        },
      });
    }
  }

  onEdit(department : any){
     
  }

  getDepartment() {
    this.departmentService.getAllDepartments().subscribe({
      next: (data: any) => {
        this.departmentList = data;
        console.log("departmentList: ",this.departmentList);
      },
      error: err => {
        console.error('Error fetching Departments', err);
      }
    });
  }


  onReset(dept : NgForm) {
    dept.resetForm();
    this.submitted = false;
    // this.isEditing = false;
    // this.selectedEmployeeForEdit = null;
      this.department = {
       departmentname: '',
        mgr: {
        id: 0
      }
    };
  }
}
