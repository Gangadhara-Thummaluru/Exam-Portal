import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToHomePage(){
    let user = JSON.parse(localStorage.getItem('user'));
    let role = user.authorities[0].authority;
    if(role=='ADMIN'){
      this.router.navigate(['/admin']);
    } else if(role=='NORMAL'){
      this.router.navigate(['/user-dashboard',0]);
    }
  }
}
