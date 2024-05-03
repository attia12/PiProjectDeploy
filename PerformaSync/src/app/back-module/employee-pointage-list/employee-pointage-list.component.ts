import { Component } from '@angular/core';
import { TimeEntryService } from '../../services/time-entry.service';
import { Router } from '@angular/router';
import { TimeEntry } from '../../Model/TimeEntry';
import {DatePipe} from "@angular/common";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-employee-pointage-list',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './employee-pointage-list.component.html',
  styleUrl: './employee-pointage-list.component.css'
})
export class EmployeePointageListComponent {
  listTimeEntries: TimeEntry[]
  Idemployee:string
  constructor(private service: TimeEntryService,private serviceUser: UserService, private router: Router) { }



  ngOnInit(): void { 
        this.service.getTimeEntries().subscribe(data=>{
          this.listTimeEntries=data
          console.log(data)
          this.listTimeEntries.forEach((t:TimeEntry) => {
              this.Idemployee=t.employee
              // this.userid=this.serviceUser.getUserIdFromToken()
              this.serviceUser.getUserNameById(t.employee).subscribe((name: { username: string })=>{t.employee=name.username})
               
              console.log(this.Idemployee)});
          console.log(data)
        })       
      }

}
