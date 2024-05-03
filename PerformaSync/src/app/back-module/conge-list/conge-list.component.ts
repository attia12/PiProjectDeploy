import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CongeServiceService } from '../../services/conge-service.service';
import { Conge } from '../../Model/Conge';
import {DatePipe, NgForOf} from "@angular/common";
import { faEdit, faAdd, faRemove } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-conge-list',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,FaIconComponent
  ],
  templateUrl: './conge-list.component.html',
  styleUrl: './conge-list.component.css'
})
export class CongeListComponent {
  isLoading=true
  faEdit=faEdit
  faAdd=faAdd;
  faDeleteLeft=faRemove;
  constructor(private congeservice: CongeServiceService, private router:Router) {}

  Conge: any = [];

  ngOnInit() {
    this.loadConge()
  }

  loadConge(){
    this.congeservice.getAllConge().subscribe(data=>{this.Conge=data;
      this.isLoading=false
      console.log(data)
    })
  }

  deleteUni(congeId: string){
    this.congeservice.deleteConge(congeId).subscribe(
      () => {
        this.loadConge();
      },
      (error) => {
        console.error('Error deleting congé:', error);
      }
    );
  }

  updateConge(conge :any)
  {
    this.router.navigateByUrl(`/back/modifyConge/${conge._id}`);

  }

  

}
