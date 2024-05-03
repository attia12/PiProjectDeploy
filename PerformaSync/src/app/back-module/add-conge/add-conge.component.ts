import { Component } from '@angular/core';
import { CongeServiceService } from '../../services/conge-service.service';
import { Router } from '@angular/router';
import { Conge, StatutCon, TypeCon } from '../../Model/Conge';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-conge',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-conge.component.html',
  styleUrl: './add-conge.component.css'
})
export class AddCongeComponent {

  NewConge : Conge = {
    
    date_deb:new Date(),
    date_fin:new Date(),
    jours_restants:0,
    statutCon: StatutCon.ENATTENTE,
    typeCon:TypeCon.MALADIE
  }

  constructor(private congeService: CongeServiceService,private router:Router) {}


  calculateJoursRestants() {
    if (this.NewConge.date_deb instanceof Date && this.NewConge.date_fin instanceof Date) {
      const diffTime = Math.abs(this.NewConge.date_fin.getTime() - this.NewConge.date_deb.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      this.NewConge.jours_restants = diffDays;
    }
  }
  AddConge(){
    console.log("the form submitting is ",this.NewConge)
    this.congeService.addConge(this.NewConge).subscribe(()=>{
      this.router.navigateByUrl('/back/listConge');
    },
      ()=>{
      console.log('failed!')
      });
  }

  navigateToListConge() {
    this.router.navigateByUrl('/back/listConge');
  }

}
