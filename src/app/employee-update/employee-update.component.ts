import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../network/employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {
  employee: Employee | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService) { }

  ngOnInit() {
    const employeeId = this.route.snapshot.paramMap.get('id');
    if (employeeId !== null) {
      this.employeeService.getEmployee(employeeId).subscribe((employee: Employee) => {
        this.employee = employee;
      });
    }
  }

  onSubmit(employee: Employee) {
    this.employeeService.updateEmployee(employee).subscribe(() => {
      this.router.navigate(['/employees']);
    });
  }

  onCancel() {
    this.router.navigate(['/employees']);
  }
}
