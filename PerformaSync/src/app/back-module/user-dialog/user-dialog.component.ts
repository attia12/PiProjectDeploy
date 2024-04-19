import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    MatFormField,
    MatDialogContent,
    MatDialogTitle,
    MatSelect,
    MatOption,
    FormsModule,
    MatDialogActions,
    MatButton,
    NgForOf,
    MatLabel
  ],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.css'
})
export class UserDialogComponent {

  user: any;
  roles: string[] = ['admin', 'company','superadmin', 'employee'];
  permissions: string[] = ['create:user', 'delete:user', 'read:user', 'update:user'];
  selectedRoles: string[] = [];
  selectedPermissions: string[] = [];
  constructor( public dialogRef: MatDialogRef<UserDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: { user: any },private userService:UserService) {
    this.user = data.user;
   this.selectedRoles=this.user.roles;
   this.selectedPermissions=this.user.permissions;

  }
  onConfirm(): void {
    const requestBody = {
      roles: this.selectedRoles,
      permissions: this.selectedPermissions
    };
    console.log('Request Body:', requestBody);
    this.userService.updatePermissionAndRoles(this.user._id,requestBody).subscribe((res:any)=>{
      this.userService.emitUserUpdated();
      console.log('Update successful:', res);
      this.dialogRef.close(requestBody);
    },error => {
      console.log(error)
    })

  }

}
