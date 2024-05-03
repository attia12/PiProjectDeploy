import { Component, OnInit } from '@angular/core';
import { MissionService } from '../../services/mission.service';
import { DatePipe, NgForOf, NgIf } from '@angular/common';
import { last } from 'rxjs';
@Component({
  selector: 'app-missions-list',
  standalone: true,
  imports: [DatePipe, NgForOf, NgIf],
  templateUrl: './missions-list.component.html',
  styleUrl: './missions-list.component.css'
})
export class MissionsListComponent {
isLoading=true
  missions:any
  constructor(private service: MissionService){  }
  ngOnInit(): void {
    this.LoadMissions()
  }

  LoadMissions(){
    this.service.getMissions().subscribe((data:any)=>{
    console.log(data)
    this.missions=data
    this.isLoading=false
  },error =>{
      console.log(error);
    })
  }

protected readonly last = last

}
