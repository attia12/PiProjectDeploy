import { Component } from '@angular/core';
import { faEdit, faAdd, faRemove } from '@fortawesome/free-solid-svg-icons';

import {FaIconComponent, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, Router } from '@angular/router';

import { Evaluation } from '../../Model/Evaluation';
import { EvaluationService } from '../../services/evaluation.service';
import {RatingsystemComponent} from "../ratingsystem/ratingsystem.component";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-evaluation-employee',
  standalone: true,
  imports: [
    RatingsystemComponent,
    FaIconComponent
  ],
  templateUrl: './list-evaluation-employee.component.html',
  styleUrl: './list-evaluation-employee.component.css'
})
export class ListEvaluationEmployeeComponent {
  faEdit=faEdit
  faAdd=faAdd;
  faDeleteLeft=faRemove;
  listEvaluations: Evaluation[]
  employee:string
  constructor(private service: EvaluationService, private router: Router,private route: ActivatedRoute,private userService:UserService) { }



  ngOnInit(): void {
    let employee = this.route.snapshot.params['employee'];
    this.service.getAllEvaluationsByEmployee(employee).subscribe(data=>{
          this.listEvaluations=data
          this.listEvaluations.forEach((t:Evaluation) => {
              // this.userid=this.serviceUser.getUserIdFromToken()
              this.userService.getUserNameById(t.company).subscribe((name: { username: string })=>{t.company=name.username})
              });
        })
    
    
    }
 onDeleteEvaluation(id: string) {
      if (confirm("Voulez vous supprimer ce evaluation ?")) {

        this.service.deleteEvaluation(id).subscribe(() => {
          this.router.navigate(['back/ListEvaluation']).then(() => {
            window.location.reload()
          })
        })
      }
    }


}
