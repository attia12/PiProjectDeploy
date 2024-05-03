import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  userForm:FormGroup;
  constructor(private userService:UserService,private _router:Router) {
    this.userForm=new FormGroup({
      username:new FormControl("",[Validators.required,Validators.minLength(4)]),
      email:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",Validators.required),
      confirmPassword: new FormControl("", Validators.required),

    });
    this.userForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.userForm.controls['confirmPassword'].updateValueAndValidity();
    });
  }

  onSubmit() {
    if(this.userForm.valid)
    {
      console.log(this.userForm.value)
      this.userService.signup(this.userForm.value).subscribe((res:any)=>{
        this.userForm.reset();
        console.log("subscribed")
        this._router.navigate(['/login']);

      },error => {

        console.log(error);
      })
    }


  }
  isCreateDisabled() {

    return this.userForm.invalid || this.userForm.value.password !== this.userForm.value.confirmPassword;
  }
  navigateToLogin() {
    this._router.navigate(['/login']);

  }
}
