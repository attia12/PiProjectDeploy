import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LettreService } from '../../services/lettre.service';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-meeting-modal',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './meeting-modal.component.html',
  styleUrl: './meeting-modal.component.css'
})
export class MeetingModalComponent {
  meetingFormModel: any = {
    lienMeet: '',
    dateDebut: '',
    time: ''
  };

  constructor(
    public dialogRef: MatDialogRef<MeetingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private lettreService: LettreService
  ) {}

  closeMeetingModal(): void {
    this.dialogRef.close();
  }

  submitMeetingForm(): void {
    const meetingDetails = {
      lienMeet: this.meetingFormModel.lienMeet,
      dateDebut: this.meetingFormModel.dateDebut,
      time: this.meetingFormModel.time
    };

    this.lettreService.sendMeet(meetingDetails, this.data.userId).subscribe(() => {
      console.log('Meeting scheduled successfully');
      this.dialogRef.close();
    }, error => {
      console.error('Error scheduling meeting:', error);
    });
  }

}
