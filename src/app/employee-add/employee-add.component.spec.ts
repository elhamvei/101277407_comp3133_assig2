import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../network/employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(employee: Employee) {
    this.employeeService.addEmployee(employee).subscribe(() => {
      this.router.navigate(['/employees']);
    });
  }

  onCancel() {
    this.router.navigate(['/employees']);
  }
}
