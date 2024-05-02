import { Component } from '@angular/core';
import { MeetingService } from '../../services/meeting.service';
import {DatePipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-meets',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    NgForOf
  ],
  templateUrl: './meets.component.html',
  styleUrl: './meets.component.css'
})
export class MeetsComponent {
  meets: any = [];
constructor(private meetSerivce:MeetingService){}
ngOnInit(){
  this.loadMeets();
}
  loadMeets() {
    this.meetSerivce.getMeets().subscribe((meets) => {
      this.meets = meets;
  }
);
}

}
