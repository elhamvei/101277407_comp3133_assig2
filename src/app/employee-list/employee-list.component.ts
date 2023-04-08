import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee';
import { EmployeeService } from '../network/employee.service';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'actions'];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to deletethis employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(
        () => {
          // Remove the deleted employee from the list
          this.employees = this.employees.filter((employee) => employee.id !== id);
        },
        (error) => {
          console.error('Error deleting employee:', error);
        }
      );
    }
  }
}

