import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm: FormGroup = new FormGroup({});
  message: string = '';

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      name: new FormControl(''),
      email: new FormControl(''),
      mobile: new FormControl(''),
      department: new FormControl('')
    });
  }

  createEmp(): void {
    const name = this.createForm.get('name')?.value;
    if (name.trim().length == 0) {
      alert("Name can't be empty");
    } else {
      this.auth.createEmployee(this.createForm.value).subscribe(res => {
        this.message = "Employee created successfully...!";
        setTimeout(()=>{
          this.router.navigate(['/dashboard']);
        }, 1000);
      });
    }
  }
}
