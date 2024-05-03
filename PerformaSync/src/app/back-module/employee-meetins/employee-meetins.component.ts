import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../services/meeting.service';
import { UserService } from '../../services/user.service';
import {DatePipe, NgForOf} from "@angular/common";
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-employee-meetins',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    FaIconComponent
  ],
  templateUrl: './employee-meetins.component.html',
  styleUrl: './employee-meetins.component.css'
})
export class EmployeeMeetinsComponent implements OnInit {
  faclose=faClose
  facheck=faCheckCircle
  isChecked=false
  isLoading=true
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
      this.isLoading=false
    },error =>{
      console.log(error);
    })
  }
  Check():void{
     this.isChecked=true
  }


}
