import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignIn } from '@fortawesome/free-solid-svg-icons';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin  from "@fullcalendar/interaction";
import { ActivatedRoute, Router } from '@angular/router';
import { TimeEntry } from '../../Model/TimeEntry';


import { UserService } from '../../services/user.service';

import { TimeEntryService } from '../../services/time-entry.service';
import { PopupService } from '../../popup/popup.service';
import { PopupAlertService } from '../../popup/popup-alert.service';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [
    FullCalendarModule
  ],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent {
  fasignin=faSignIn
fasignout=faSignOut;
selectedDate: Date | null = null;
listTimeEntries: TimeEntry[]
  user:any=null;
  userId:any;
  accessToken!: string | null;
  decodedtoken: any;
constructor(private userservice: UserService,private service: TimeEntryService, private router: Router,private popupService: PopupService,private popupAlertService: PopupAlertService){}
ngOnInit(): void {
   this.accessToken=localStorage.getItem('access_token')
   this.userId=this.userservice.getUserIdFromToken();
   this.user=this.userservice.getUserById(this.user);
   console.log(this.userId)

        this.service.getAllTimeEntriesByEmployee(this.userId).subscribe((data)=>{
          this.listTimeEntries=data;
          console.log(data);
          this.createCalendarEvents();
        })
      }
      openPopupAlert() {
    this.popupAlertService.openPopup();
  }
openPopup(selectedDate:any) {
    this.popupService.openPopup(selectedDate);
  }

createCalendarEvents() {
  const events: any[] = []; // Array to store calendar events
  this.listTimeEntries.forEach(entry => {
    let title = 'Absent'; // Default title to "Absent"
    if (entry.tempsDeTravail !="") {
      title = 'Present'; // Update title to "Present" if status is "present" (case-insensitive)
    }

    const event = {
      title,
      start: new Date(entry.date),
      end:new Date(entry.date),
      allDay: true,
      // You can add other event properties based on your TimeEntry data
    };
    events.push(event);
  });
  this.calendarOptions.events = events; // Update calendar events
}

  dateClick(arg:any) {

    this.selectedDate = arg.start || arg.date;

  const today = new Date();
  const isToday = this.selectedDate.getDate() === today.getDate() &&
                 this.selectedDate.getMonth() === today.getMonth() &&
                 this.selectedDate.getFullYear() === today.getFullYear();

  if (isToday) {
     const matchingEntry = this.listTimeEntries.find(entry => {
      const entryDate = new Date(entry.date).toLocaleDateString();
      const selectedDateStr = this.selectedDate.toLocaleDateString();
      return entryDate === selectedDateStr; // Case-sensitive date comparison
    });
    if (matchingEntry) {
      // Show alert if a matching entry (present) is found
this.openPopupAlert()    } else {
      this.openPopup(this.selectedDate); // Open popup for adding
        // this.router.navigate(['front/EmployeeEntry', { selectedDate: this.selectedDate }]);
    }
  } else {
this.openPopupAlert()
    }
}

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [timeGridPlugin, dayGridPlugin,interactionPlugin], // Removed redundant dayGridPlugin
    select: this.dateClick.bind(this),
    selectable: true,
    events: [],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    buttonText: {
      prev: 'Prev',
      next: 'Next',
      today: 'Today',
      dayGridMonth: 'Month',
      timeGridWeek: 'Week',
      timeGridDay: 'Day'
    }
  };

}
