import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../services/meeting.service';
import { UserService } from '../../services/user.service';
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-employee-meetins',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './employee-meetins.component.html',
  styleUrl: './employee-meetins.component.css'
})
export class EmployeeMeetinsComponent implements OnInit {
  meets:any;
  userId:any;
  constructor(private meetingService:MeetingService,private userService:UserService)
  {

  }
  ngOnInit(): void {
    this.userId=this.userService.getUserIdFromToken();

   this.loadMeetByUser();
  }
  loadMeetByUser() {
    this.meetingService.getMeetingByUserId(this.userId).subscribe((res:any)=>{
      this.meets=res;

    },error =>{
      console.log(error);
    })
  }


}
