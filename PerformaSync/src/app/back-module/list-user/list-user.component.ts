import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faArrowAltCircleDown, faArrowAltCircleUp, faEdit, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import {UserService} from "../../services/user.service";
import {MatDialog} from "@angular/material/dialog";
import {UserDialogComponent} from "../user-dialog/user-dialog.component";
import {Subscription} from "rxjs";
import Swal from "sweetalert2";
import { EditUserComponent } from '../edit-user/edit-user.component';



@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit,OnDestroy{

  faArrowUp=faArrowAltCircleUp
  faArrowDown=faArrowAltCircleDown
  faInfo=faInfoCircle
  faAdd=faAdd;
  faDeleteLeft=faRemove;
  RatingTri=0;
  alphabeticTri=0;
  isRotatedAl=1;
  isRotatedAv=1;
  list:any;
  listUsers: any[]=[];
  private userUpdateSubscription!: Subscription;
  @ViewChild('rowElement') rowElement!: ElementRef;
  constructor(private userService:UserService,private dialog: MatDialog) {
  }


  trierUsersByAlphabetics() {

  }

  ngOnInit(): void {

    this.loadUsers();
    this.subscribeToUserUpdates();

  }
  ngOnDestroy(): void {
    this.userUpdateSubscription.unsubscribe();
  }

  private loadUsers() {
    this.userService.getAllUserExceptSuperAdmin().subscribe((res:any)=>{
      this.list=res;
      console.log(this.list);
      this.list.forEach((user: any) => {
        if (user.image) {
          this.getImageProfile(user);
        }
      });

    },error => {
      console.log(error)
    })

  }

  private getImageProfile(user: any) {
    this.userService.getUserImage(user.image).subscribe(
      (imageData: any) => {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          user.image = event.target.result;
        };
        reader.readAsDataURL(imageData);
      },
      error => {
        console.log('Error fetching profile image:', error);
      }
    );

  }

  protected readonly faEdit = faEdit;

  openUserDialog(user: any) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: { user: user }
    });


    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });


  }

  private subscribeToUserUpdates() {
    this.userUpdateSubscription = this.userService.getUserUpdatedSubject().subscribe(() => {
      this.loadUsers(); // Reload user list on update
    });
  }

  deleteUser(event: MouseEvent,_id: any) {
    event.stopPropagation();

    Swal.fire({
      icon:'info',
      title:'Are you sure ?',
      confirmButtonText:'Delete',
      showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed)
      {
        this.userService.deleteUserAccount(_id).subscribe((res:any)=>{
          this.userService.emitUserUpdated();
          Swal.fire("Success !!","Account deleted",'success')

        },error => {
          Swal.fire("Error !!","Error in deleting account",'error')

          console.log(error)
        })

      }

    })

  }


  openEditDialog($event: MouseEvent, data: any) {
    $event.stopPropagation();
    console.log("dddddddddddddddd",data)
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '250px',
      data: data 
    });

    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      
    });

  }
}
