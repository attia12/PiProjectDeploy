import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit{
  email: any;
  constructor(private userService:UserService,private router:Router) {
  }
  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.email);
    this.userService.getOtp(this.email).subscribe((res:any)=>{
      console.log(res)
      this.router.navigate(['/resetPassword'])

    },error => {
      console.log(error)
    })


  }
  navigateToLogin(){
    this.router.navigate(['/login'])

  }
}
