import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from '@angular/material/dialog';
import {MatFormField} from "@angular/material/form-field";
import {FormsModule, NgForm} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import { UserService } from '../../services/user.service';
import { MissionService } from '../../services/mission.service';

@Component({
  selector: 'app-add-mission-modal',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    MatInput,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatSelect,
    MatOption
  ],
  templateUrl: './add-mission-modal.component.html',
  styleUrl: './add-mission-modal.component.css'
})
export class AddMissionModalComponent implements OnInit {
  mission: any = {};
  @Output() missionAdded: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<AddMissionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private userService:UserService,private misssionService:MissionService
  ) {}
  ngOnInit(): void {
    this.mission.assignedManager = this.userService.getUserIdFromToken();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
  onSubmit(missionForm: NgForm): void {
    if (missionForm.valid) {
      console.log(this.mission);
      this.misssionService.createMission(this.mission).subscribe((res:any)=>{
        console.log("success");
        this.dialogRef.close(this.mission);
        this.missionAdded.emit();

      },error =>{
        console.log(error)
        

      })
      
    } else {
      console.log('Form is invalid.');
    }
  }

}
