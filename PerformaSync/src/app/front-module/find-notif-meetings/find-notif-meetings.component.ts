import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
/*
import { LettreService } from '../../services/lettre.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';
*/
@Component({
  selector: 'app-find-notif-meetings',
  standalone: true,
  imports: [CommonModule,NavBarComponent,FooterComponent,RouterModule],
  templateUrl: './find-notif-meetings.component.html',
  styleUrl: './find-notif-meetings.component.css'
})
export class FindNotifMeetingsComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 /* meet:any;
constructor(private lettreService:LettreService){}
ngOnInit(): void {
  this.loadNotifs();
}
  loadNotifs() {
   this.lettreService.getMeetByUserId().subscribe((meet)=>{
   this.meet=meet;
   console.log(meet)
   });
  }*/
}
