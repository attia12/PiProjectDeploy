import { Component } from '@angular/core';
import { MissionService } from '../../services/mission.service';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {last} from "rxjs";
import { SubmitCandidateModalComponent } from '../submit-candidate-modal/submit-candidate-modal.component';
import { MatDialog } from '@angular/material/dialog';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faInfo} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-employee-tracking-misssion',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    NgIf,
    FaIconComponent
  ],
  templateUrl: './employee-tracking-misssion.component.html',
  styleUrl: './employee-tracking-misssion.component.css'
})
export class EmployeeTrackingMisssionComponent {
  missions:any
  constructor(private service:MissionService,private dialog: MatDialog){  }
  ngOnInit(): void {
    this.LoadMission();
  }

  LoadMission(){
    this.service.getMissionsPending().subscribe((data:any) =>{
      this.missions=data;
      console.log(this.missions)
  },error =>{
      console.log(error);
    })

}
openSubmitCandidateModal(mission: any): void {
  const dialogRef = this.dialog.open(SubmitCandidateModalComponent, {
    width: '500px',
    data: { mission: mission }
  });

  dialogRef.afterClosed().subscribe(result => {
    // Handle modal close
  });
}

  protected readonly last = last;


  protected readonly faInfo = faInfo;
}
