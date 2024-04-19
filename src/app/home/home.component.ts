import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [ApiService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  protected employeesList: any;
  protected employeeDetailsForm!: FormGroup;

  constructor(private employeeService: ApiService, private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm()
    // Here I am calling the getAllEmployeesOnPageLoad() function because on loading this page I want all the employess list;
    // If you want all employees list only on event or something you can call simply this method on those events;
    this.getAllEmployeesOnPageLoad();
    // this.getEmployessListByUsingHttp();
  }

  private createForm() {
    this.employeeDetailsForm = this.fb.group({
      id: new FormControl(null),
      name: new FormControl(''),
      designation: new FormControl(''),
      email: new FormControl('')
    })
  }

  private getEmployessListByUsingHttp() {
    // Here I am calling the get method in this component only with out using service file;
    // But in most cases we are not calling the get call like this in real time project because Service file provide you the benefit like you can use this method/function (simply business logic) all over application
    // that means you can reuse one logic all over application with out repeating/rewriting
    this.http.get('http://localhost:3000/users').subscribe((employees: any) => {
      this.employeesList = employees;
    })
  }

  private getAllEmployeesOnPageLoad(): void {
    this.employeeService.getEmployees().subscribe((employees: any) => {
      this.employeesList = employees;
    });
  }
  // This is a funtion declartion to perform some actions;
  // this function we can use in html and inside this ts file only based on our requirement or use case we can use anywhere we want;
  protected editEmployeeDetails(employeeDetails: any) { //here employeeDetails inside the brackets() we can call arguments;
    // You can give any name this arguments , but try to give some meaningfull name so you can know why you are using and what is that argument;
    // while calling this function you have to pass the parameters as same order because;
    // for example here I am calling a sum function and passing some keys userDetails(1,john);
    // function suuserDetails(id, name) {
    //   console.log(id , name);
    // }

    // If you observe I am calling sum function and passed the keys in order 1,john in declartion i have given arguments as id, name
    // so inside the function the values will be id=1,name = john, so beacuse of those are the orders i have declared;
    // for suppose if you are called the function like (samnatha, 5) in function the id = samantha, name = 5;
    // then total your function can mislead or throws error
    // if you are using typescript make sure you can use typing  while declaration because of that it will warn you if you are passing any wrong keys like if id hold type number then you are passed some string it will give you warning like hey you are passing the string instead of number this function is not taking this string is not accepted;

    console.log('Accessing entire employee/object details by using employee :::', employeeDetails);

    // here we can patch the values in two ways;
    // first method is we are calling editEmployeeDetails() in html by clicking on edit button
    // in employeeDetails it holds whole object/employeedetails so we can directly patch the value by using employee;

    this.employeeDetailsForm.patchValue({
      id: employeeDetails.id,
      name: employeeDetails.name,
      designation: employeeDetails.designation,
      email: employeeDetails.email
    });

    // the second method is by getEmployeById(employeeId) here already employeeDetails hold employeeId as it holds whole the object/employee details so we can get the particualr employee details based on his ID
    // So simply we can call the getEmployeById(employeeDetails.id) by using employeeDetails.id then patch the values;

    // this.employeeService.getEmployeById(employeeDetails.id).subscribe((employee: any) => {
    //   this.employeeDetailsForm.patchValue({
    //     id: employee.id,
    //     name: employee.name,
    //     designation: employee.designation,
    //     email: employee.email
    //   });
    // });


    this.employeeService.updateEmployeeDetails(employeeDetails).subscribe((response: any) => {
      console.log('Response after updating details :::', response);
    });
  }

  protected createDetails() {
    // Here I am resetting/clear all the previous values from this form group all input field;
    // Because to while creating this one holds any previous values;
    this.employeeDetailsForm.reset();

  }

  protected removeEmployeeDetails(employeeId: number) {
    console.log('Accessing only one field/key/property of the employee/object :::', employeeId)
    this.employeeService.removeEmployee(employeeId).subscribe((res: any) => {
      console.log('response after removing records :::', res);
      this.getAllEmployeesOnPageLoad();
    });
  }

  protected saveChanges() {
    // in this save changes function I am using for create a new record and update existring record;
    // here I am using a if condition that checks in the formgroup = employeeDetailsForm that hold a id or not;
    // If there is a id that means there is already a record existring so we want to just update the details
    // else we want to create a new record/employee details

    // for close the dropdown after saving the details here I am using const closeDropdown.click() to hit close button form ts file by using document.getElementById();

    const closeDropwDown = document.getElementById('close');
    if (this.employeeDetailsForm.value.id) {
      this.employeeService.updateEmployeeDetails(this.employeeDetailsForm.value).subscribe((response: any) => {
        console.log('After updating / saving employee details the response is ::: ', response);
        this.getAllEmployeesOnPageLoad();
      })
    } else {
      this.employeeService.createEmployeeDetails(this.employeeDetailsForm.value).subscribe((response: any) => {
        console.log('Response after creating new records :::', response);
        this.getAllEmployeesOnPageLoad();
      })
    }
    closeDropwDown?.click();
  }

}
