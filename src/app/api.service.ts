import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Here HttpClient is used to communicate with backend;
  // 

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:3000/users'; //Here we can replace with our original end point

  // GET CALL TO GET ALL RECORDS
  public getEmployees() {
    // here I am using get method to get all the user details from backend 
    // get method accept two parameters one is url that is mostly gives the backend people : Eg --> here in our case my backend url is http://localhost:3000/users
    // second parameter is optional , some cases we want only paricular object or example here is I want only one user details that matches with the id , So will I pass that ID as a parameter;
    // if you want to check how we can get the userdetails by id you can check getUserById() function that I created below this dunction;

    return this.http.get(this.baseUrl);
  }
  // GET CALL BY ID GET ONLY ONE RECORD BASED ON ID; 
  public getEmployeById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // POST CALL TO CREATE NEW RECORD;
  public createEmployeeDetails(employee: any) {
    // here I am creating new record/employee details by using POST call;
    // for post call we are going to need one endpoint/url path where we want to create 
    // and second is record/employee details that we wanted to create
    return this.http.post(this.baseUrl, employee);
  }

  // PUT CALL TO UPDATE EXISTING RECORD;
  public updateEmployeeDetails(employeeDetails: any) {
    // in this function I am updating the existing employee details/record 
    // for put call we are going to need one endpoint/url where we want to update the details
    // so to update the details we are using put call and for put call basically we need one id where we want to update the details
    // and the new updated/edited details that going to replace old record/details;
    return this.http.put(`${this.baseUrl}/${employeeDetails.id}`, employeeDetails);
  }

  // DELETE CALL TO DELETE RECORD; 
  public removeEmployee(employeeId: number) {
    //in this function I am removing the employee details from list by using id;
    //for delete call we are goig to need one endpoint/url from which location where we want to delete
    // and the id which is which id record we want to delete
    //removing by id is easy and secure because id is unique so it will remove only one record;
    return this.http.delete(`${this.baseUrl}/${employeeId}`);
  }
}
