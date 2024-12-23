import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit{
constructor(private auth: AuthService, private route: ActivatedRoute){}
empId: any;
empDetails: any;
ngOnInit(): void {
  this.route.params.subscribe(res=>{
    this.empId = res['id'];
  });
  this.auth.getEmployeeById(this.empId).subscribe(res=>{
    this.empDetails = res;
  });
}
}
