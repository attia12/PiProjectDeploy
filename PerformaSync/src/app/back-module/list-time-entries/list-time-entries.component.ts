import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { TimeEntry } from '../../Model/TimeEntry';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faAdd, faRemove } from '@fortawesome/free-solid-svg-icons';

import { UserService } from '../../services/user.service';
import { TimeEntryService } from '../../services/time-entry.service';

@Component({
  selector: 'app-list-time-entries',
  standalone: true,
  imports: [DatePipe,FontAwesomeModule],
  providers:[DatePipe],

  templateUrl: './list-time-entries.component.html',
  styleUrl: './list-time-entries.component.css'
})
export class ListTimeEntriesComponent {
  faEdit=faEdit
  faAdd=faAdd;
  faDeleteLeft=faRemove;
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

      onDeleteTimeEntry(id: string) {
      if (confirm("Voulez vous supprimer ce evaluation ?")) {

        this.service.deleteTimeEntry(id).subscribe(() => {
          this.router.navigate(['back/ListTimeEntries']).then(() => {
            window.location.reload()
          })
        })
      }
    }
}
