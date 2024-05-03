import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  constructor(private userService:UserService,private router:Router) {
  }
  email: any;
  otp: number=0;
  newPassword: any;


  onSubmit() {

    const data = {
      email: this.email,
      otp: +this.otp,
      newPassword: this.newPassword
    };
    console.log(data)
    this.userService.resetPassword(data).subscribe(()=>{
      console.log("password update")
      this.router.navigate(['/login']);

    },error => {
      console.log(error)
    })



  }
}
