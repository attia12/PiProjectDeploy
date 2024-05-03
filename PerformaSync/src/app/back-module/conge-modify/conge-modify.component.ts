import { Component, OnInit } from '@angular/core';
import { Conge, StatutCon, TypeCon } from '../../Model/Conge';
import { ActivatedRoute, Router } from '@angular/router';
import { CongeServiceService } from '../../services/conge-service.service';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-conge-modify',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './conge-modify.component.html',
  styleUrl: './conge-modify.component.css'
})
export class CongeModifyComponent implements OnInit {
  NewConge : Conge = {
   
    date_deb:new Date(),
    date_fin:new Date(),
    jours_restants:0,
    statutCon: StatutCon.ENATTENTE,
    typeCon:TypeCon.MALADIE
  }

  constructor(private activatedroute: ActivatedRoute, private congeservice: CongeServiceService, private router:Router) {}

  ngOnInit() {
    this.activatedroute.params.subscribe((params) => {
      let id=params['id'];
      this.congeservice.getCongeById(id).subscribe((con:Conge)=>{
        console.log(con)
        
        this.NewConge = con;
      })
    })
  }

  modifyConge(){
    this.congeservice.modifyConge(this.NewConge).subscribe(
      ()=>{
        
        this.router.navigateByUrl('/back/listConge');
      },
      ()=>{
        console.log('failed')
      }
    );
  }

  navigateToAddConge() {
    this.router.navigateByUrl('/back/addConge');
  }

  navigateToListConge() {
    this.router.navigateByUrl('/back/listConge');
  }

}
