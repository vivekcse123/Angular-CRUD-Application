import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  //sdfer
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
constructor(private auth: AuthService, private router: ActivatedRoute){}
allEmployees: any[] = [];
ngOnInit(): void {
    this.auth.getAllEmployees().subscribe((res: any)=>{
      this.allEmployees = res;
      console.log(this.allEmployees);
    });
}

message = "";
delete(id: any){
  if(confirm("Are you sure?") == false){
    this.message = "Canceled....!";
    setTimeout(()=>{
      this.message = "";
    }, 2000);
    return;
  }
  this.auth.deleteEmployee(id).subscribe(res=>{
    this.message = "Deleted.....!";
    this.allEmployees = this.allEmployees.filter((emp) => emp.id !== id);
    setTimeout(()=>{
      this.message = "";
    }, 2000);
  })
}
}
