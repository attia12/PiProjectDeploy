import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {EditProfilComponent} from "../edit-profil/edit-profil.component";
import {validate as uuidValidate} from 'uuid'

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    MatCardActions,
    MatButton,
    MatCardContent,
    MatCard,
    NgIf
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit{
  user:any=null;
  userId:any;
  accessToken!: string | null;

  constructor(private userService:UserService,private _router:ActivatedRoute,private dialog:MatDialog) {




  }

  ngOnInit(): void {
    this.accessToken = this._router.snapshot.queryParamMap.get('access_token');

    // Store the access token in local storage
    if (typeof this.accessToken === "string") {
      localStorage.setItem('access_token', this.accessToken);
    }

    this.userId=this._router.snapshot.params['id'];


    console.log("the user id",this.userId )
    this.getUserInfo();

  }
  getUserInfo()
  {
    this.userService.getUserById(this.userId).subscribe((res:any)=>{
      this.user=res;
      console.log(res);
      if(this.user.image)
      {
        this.getImageProfile(this.user.image);
      }

    },error => {
      console.log(error)
    })
  }
  getImageProfile(imageName:any)
  {
    this.userService.getUserImage(imageName).subscribe(
      (imageData: any) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.user.image = event.target.result;
        };
        reader.readAsDataURL(imageData);
      },
      error => {
        console.log('Error fetching profile image:', error);
      }
    );
  }


  openDialogProfil() {
    const dialogRef = this.dialog.open(EditProfilComponent);
    dialogRef.componentInstance.uploadSuccess.subscribe(() => {
      this.getUserInfo();
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });

  }

  // private loginGoogle(userId: any) {
  //
  //   this.userService.loginGoogle(userId).subscribe((res:any)=>{
  //     console.log("the user google ",res)
  //     this.user={...res}
  //   },error => {
  //
  //     console.log(error);
  //   })
  //
  // }




}
