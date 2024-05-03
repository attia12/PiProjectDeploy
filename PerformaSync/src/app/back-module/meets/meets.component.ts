import { Component } from '@angular/core';
import { MeetingService } from '../../services/meeting.service';
import {DatePipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import { faFileContract } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-meets',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    NgForOf,FaIconComponent
  ],
  templateUrl: './meets.component.html',
  styleUrl: './meets.component.css'
})
export class MeetsComponent {
  isLoading=true
  faContract=faFileContract
  meets: any = [];
constructor(private meetSerivce:MeetingService){}
ngOnInit(){
  this.loadMeets();
}
  loadMeets() {
    this.meetSerivce.getMeets().subscribe((meets) => {
      this.meets = meets;
      this.isLoading=false
  }
);
}

}
