import { Component } from '@angular/core';
import { Evaluation } from '../../Model/Evaluation';

import { Router } from '@angular/router';
import {FaIconComponent, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { RatingsystemComponent } from '../ratingsystem/ratingsystem.component';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';
import { EvaluationService } from '../../services/evaluation.service';


@Component({
  selector: 'app-list-evaluation',
  standalone: true,
  imports: [
    FaIconComponent,
    RatingsystemComponent
  ],
  templateUrl: './list-evaluation.component.html',
  styleUrl: './list-evaluation.component.css'
})
export class ListEvaluationComponent {
  faArrowUp=faArrowAltCircleUp
  faArrowDown=faArrowAltCircleDown
  faInfo=faInfoCircle
  faAdd=faAdd;
  faDeleteLeft=faRemove;
  RatingTri=0;
  alphabeticTri=0;
  isRotatedAl=1;
  isRotatedAv=1;
  list:any;
  listEvaluations: Evaluation[]
  userid:string
  user:string
  Idemployee:string
  constructor(private service: EvaluationService,private serviceUser: UserService, private router: Router) { }


  ngOnInit(): void {

        this.service.getEvaluationsByEmployee().subscribe(data=>{
          this.list=data
          console.log(data)
            this.list.forEach((l:Evaluation) => {
              this.Idemployee=l.employee
              // this.userid=this.serviceUser.getUserIdFromToken()
              this.serviceUser.getUserNameById(this.Idemployee).subscribe((name: { username: string })=>{l.employee=name.username})

              console.log(this.Idemployee)});
          console.log(data)
        })
      }

 trierEmlpoyeeByRating() {
  if(this.RatingTri == 1){
    this.list.sort((a, b) => (a.averageRating > b.averageRating) ? 1 : -1)
    this.RatingTri=0
    this.isRotatedAv=1

  }else{
     this.list.sort((a, b) => (a.averageRating < b.averageRating) ? 1 : -1)
    this.RatingTri=1
    this.isRotatedAv=0

  }
  }
  trierEmlpoyeeByAlphabetics() {
     if(this.RatingTri == 1){
    this.list.sort((a, b) => (a.employee > b.employee) ? 1 : -1)
    this.RatingTri=0
    this.isRotatedAl=1
  }else{
    this.list.sort((a, b) => (a.employee < b.employee) ? 1 : -1)
    this.RatingTri=1
    this.isRotatedAl=0
  }

  }

}
