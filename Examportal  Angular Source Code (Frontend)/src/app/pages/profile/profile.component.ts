import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user = null;
  constructor(private login: LoginService,private router: Router) {}
  role:string;
  ngOnInit(): void {
    this.user = this.login.getUser();
    let user = JSON.parse(localStorage.getItem('user'));
    let role = user.authorities[0].authority;
    this.role = role;
    // this.login.getCurrentUser().subscribe(
    //   (user: any) => {
    //     this.user = user;
    //   },
    //   (error) => {
    //     alert('error');
    //   }
    // );
  }
  openForm(){
    this.router.navigate(['/signup'], { queryParams: this.user });
  }
  navigateToHome(){
    let user = JSON.parse(localStorage.getItem('user'));
    let role = user.authorities[0].authority;
    this.role = role;
    console.log(this.role);
    if(role=='ADMIN'){
      this.router.navigate(['/admin']);
    } else if(role=='NORMAL'){
      this.router.navigate(['/user-dashboard',0]);
    }
  }
}
