import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL: string = "http://localhost:3000/employees";
  constructor(private http: HttpClient) { }

  //read employees data ( Read operation)
  getAllEmployees(){
    return this.http.get(this.baseURL);
  }

  //get employee by id (read operation)
  getEmployeeById(id: any){
    return this.http.get(this.baseURL + "/" + id);
  }

  //create or add new employee (Post operation)
  createEmployee(obj: any){
    return this.http.post(this.baseURL + "/", obj);
  }

  //update employee data (Put operation)
  updateEmployee(id: any, obj: any) {
    return this.http.put(this.baseURL + '/' + id , obj);
}

  //delete employee (Delete operation)
  deleteEmployee(id: any){
    return this.http.delete(this.baseURL + "/" + id);
  }
}
