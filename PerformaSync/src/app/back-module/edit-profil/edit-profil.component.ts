import {Component, EventEmitter} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

import {MatInput} from "@angular/material/input";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-edit-profil',
  standalone: true,
  imports: [

    MatInput,
    MatButton,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions

  ],
  templateUrl: './edit-profil.component.html',
  styleUrl: './edit-profil.component.css'
})
export class EditProfilComponent {
  selectedFile: File | null = null;

  uploadSuccess: EventEmitter<void> = new EventEmitter<void>();
  constructor(public dialogRef: MatDialogRef<EditProfilComponent>,private userService:UserService) { }

  cancel() {
    this.dialogRef.close();

  }

  upload() {
    if (this.selectedFile) {

      console.log('Selected file:', this.selectedFile);
      this.userService.uploadImage(this.selectedFile).subscribe((res)=>{
        console.log('File uploaded successfully:', res);
        this.uploadSuccess.emit();
      },error => {
        console.log(error);
      })
    }
    this.dialogRef.close();

  }

  handleFileInput($event: Event) {
    if (event && event.target) {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        this.selectedFile = inputElement.files[0];
      }
    }

  }
}
