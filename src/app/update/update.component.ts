import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit{
constructor(private route: ActivatedRoute, private fb: FormBuilder, private auth: AuthService, private router: Router){}
empId: any;
empDetails: any;
isLoaded: boolean = false;
updateForm: FormGroup = new FormGroup({});
ngOnInit(): void {
  this.route.params.subscribe(res=>{
    this.empId = res['id'];
    console.log(this.empId);
  });
  if(this.empId !== ''){
    this.auth.getEmployeeById(this.empId)
    .toPromise()
    .then(res=>{
      this.empDetails = res;
      this.updateForm = this.fb.group({
        'name': new FormControl(this.empDetails.name),
        'email': new FormControl(this.empDetails.email),
        'mobile': new FormControl(this.empDetails.mobile),
        'department': new FormControl(this.empDetails.department)
      });
      this.isLoaded = true;
    });
  }
}
message: any;
UpdateEmp(){
  this.auth.updateEmployee(this.empId, this.updateForm.value).subscribe(res=>{
    this.message = "Employee updated successfully..!";
    setTimeout(()=>{
      this.router.navigate(['/view/' + this.empId]);
    }, 1000);
  });
}
}
