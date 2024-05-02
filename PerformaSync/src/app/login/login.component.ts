import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import { environment } from '../../environments/environment.development';







@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;




  constructor(private formBuilder :FormBuilder,private userService:UserService,private router :Router) {
    this.loginForm=this.createLoginForm();
  }

  ngOnInit(): void {
    this.userService.userRoles$.subscribe(roles => {
      if (roles && roles.length > 0) {
        this.handleNavigation(roles);
      }
    });


  }

  createLoginForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
     this.userService.login(this.loginForm.value).subscribe(()=>{
       console.log("Login successful");
       //this.toast.success('Login successful')

       this.userService.updateUserRole()

     },error => {
       console.log(error)
     })

    }
  }

  private handleNavigation(roles: string[]) {

    if (roles.includes('superadmin')) {
      this.router.navigate(['/back']);
    } else if (roles.includes('admin')) {
      this.router.navigate(['/back']);
    } else if (roles.includes('company')) {
      this.router.navigate(['/back']);
    } else if (roles.includes('employee')) {
      this.router.navigate(['/back']);
    } else {
      console.log("Unknown roles");
      // Navigate to a default page or handle as needed
    }


  }


  navigateToCam() {
    this.router.navigate(['/cam']);

  }
  navigateToSignUp() {
    this.router.navigate(['/signup']);

  }
  navigateToForgotPassword()
  {
    this.router.navigate(['/forgotpassword']);

  }
  sendGoogleRequest()
  {
    this.router.navigate([`'${environment.baseUrl}/user/google'`]);

  }
}
