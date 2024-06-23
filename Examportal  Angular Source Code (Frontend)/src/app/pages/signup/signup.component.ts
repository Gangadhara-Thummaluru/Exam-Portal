import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService, private snack: MatSnackBar,private _route: ActivatedRoute,
    private _snak: MatSnackBar,private router: Router) {
      
    }

  public user = {
    id:0,
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  mode:string='create';
  ngOnInit(): void {
    this.mode = 'create';
    let data;
    this._route.queryParams.subscribe(params => {
      data = params; // Access the user object
      if(data!=null){
        debugger
        
        if(data.id>0){
          this. user = {
            id:data.id,
            username: data.username,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
          };
          this.mode = 'edit';
        }
      }
    });
    console.log(data)
  }

  formSubmit() {
    if (this.user.username == '' || this.user.username == null) {
      // alert('User is required !!');
      this.snack.open('Username is required !! ', '', {
        duration: 3000,
      });
      return;
    }
    if(this.mode=='create'){
      console.log(this.user);
  
      if (this.user.password == '' || this.user.password == null) {
        // alert('User is required !!');
        this.snack.open('Password is required !! ', '', {
          duration: 3000,
        });
        return;
      }
  
      //validate
  
      //addUser: userservice
      this.userService.addUser(this.user).subscribe(
        (data: any) => {
          //success
          console.log(data);
          //alert('success');
          Swal.fire('Successfully done !!', 'User id is ' + data.id, 'success');
        },
        (error) => {
          //error
          console.log(error);
          // alert('something went wrong');
          this.snack.open(error.error.text, '', {
            duration: 3000,
          });
        }
      );
    } else if(this.mode=='edit'){
      //editUser: userservice
      this.userService.updateUser(this.user).subscribe(
        (data: any) => {
          //success
          console.log('data',data);
          this.user = data;
          console.log(this.user);
          localStorage.setItem('user',JSON.stringify(this.user));
          //alert('success');
          Swal.fire('User details updated !!', 'User with id is ' + data.id+' updated', 'success');
          let role = data.authorities[0].authority;
          if(role=='ADMIN'){
            this.router.navigate(['/admin']);
          } else if(role=='NORMAL'){
            this.router.navigate(['/user-dashboard',0]);
          }
        },
        (error) => {
          //error
          console.log(error);
          // alert('something went wrong');
          this.snack.open(error.error.text, '', {
            duration: 3000,
          });
  }
);
    }
  }
  clearUserData(){
    this.user ={
      id:0,
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    }
  }
  //this.user
}
