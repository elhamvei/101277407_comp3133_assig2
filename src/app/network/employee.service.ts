import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../models/employee';

// Define GraphQL queries and mutations
const GET_EMPLOYEES = gql`
  query employees {
    employees {
      id
      first_name
      last_name
      email
    }
  }
`;

const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      id
      first_name
      last_name
      email
    }
  }
`;

const ADD_EMPLOYEE = gql`
  mutation AddEmployee($first_name: String!, $last_name: String!, $email: String!) {
    addEmployee(first_name: $first_name, last_name: $last_name, email: $email) {
      id
      first_name
      last_name
      email
    }
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $first_name: String, $last_name: String, $email: String) {
    updateEmployee(id: $id, first_name: $first_name, last_name: $last_name, email: $email) {
      id
      first_name
      last_name
      email
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private apollo: Apollo) { }

  getEmployees(): Observable<Employee[]> {
    return this.apollo.watchQuery<{ employees: Employee[] }>({
      query: GET_EMPLOYEES,
    }).valueChanges.pipe(
      map(result => result.data.employees)
    );
  }

  getEmployee(id: string): Observable<Employee> {
    return this.apollo.watchQuery<{ employee: Employee }>({
      query: GET_EMPLOYEE,
      variables: { id },
    }).valueChanges.pipe(
      map(result => result.data.employee)
    );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.apollo.mutate<{ addEmployee: Employee }>({
      mutation: ADD_EMPLOYEE,
      variables: employee,
      refetchQueries: [{ query: GET_EMPLOYEES }],
    }).pipe(
      map(result => (result.data ? result.data.addEmployee : {} as Employee))
    );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.apollo.mutate<{ updateEmployee: Employee }>({
      mutation: UPDATE_EMPLOYEE,
      variables: employee,
      refetchQueries: [{ query: GET_EMPLOYEES }],
    }).pipe(
      map(result => (result.data ? result.data.updateEmployee : {} as Employee))
    );
  }

  deleteEmployee(id: string): Observable<string> {
    return this.apollo.mutate<{ deleteEmployee: string }>({
      mutation: DELETE_EMPLOYEE,
      variables: { id },
      refetchQueries: [{ query: GET_EMPLOYEES }],
    }).pipe(
      map(result => (result.data ? result.data.deleteEmployee : ''))
    );
  }
}

