import { Component,  OnInit } from '@angular/core';
import { MissionService } from '../../services/mission.service';
import { UserService } from '../../services/user.service';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import { MatDialog } from '@angular/material/dialog';
import { AddMissionModalComponent } from '../add-mission-modal/add-mission-modal.component';
import {last} from "rxjs";
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-mission-company',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf,FaIconComponent
  ],
  templateUrl: './mission-company.component.html',
  styleUrl: './mission-company.component.css'
})
export class MissionCompanyComponent implements OnInit {
  isLoading=true
  missions:any;
  

  constructor(private missionService:MissionService,private userService:UserService,private dialog: MatDialog)
  {

  }
  ngOnInit(): void {


    this.loadMissison()
  }
  loadMissison() {
    this.missionService.getMissionsByCompanyId(this.userService.getUserIdFromToken()).subscribe((res:any)=>{
      console.log(res)
      this.missions=res;
      this.isLoading=false
    },error =>{
      console.log(error);
    })


}
openAddMissionModal() {
  const dialogRef = this.dialog.open(AddMissionModalComponent, {
      width: '500px',
      data: {}
  });

  dialogRef.componentInstance.missionAdded.subscribe(() => {
      this.loadMissison(); 
  });

  dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
  });
}

  protected readonly last = last;
}
