import { Component } from '@angular/core';
import { Evaluation } from '../../Model/Evaluation';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { EvaluationService } from '../../services/evaluation.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-ajout-evaluation',
  standalone: true,
  imports: [
    FaIconComponent,
    ReactiveFormsModule
  ],
  templateUrl: './ajout-evaluation.component.html',
  styleUrl: './ajout-evaluation.component.css'
})
export class AjoutEvaluationComponent {
  EvaluationForm: FormGroup
  formSubmitted = false;
  faStar = faStar;
  rating=0
   idEmployee: string

    constructor(private services: EvaluationService,private serviceUser: UserService, private router: Router, private fb: FormBuilder,private route: ActivatedRoute, private snackBar: MatSnackBar // MatSnackBar injection
  ) {
    let formControls = {
      commentaire: new FormControl('',[
      Validators.required,
      Validators.minLength(10),]),
      // note: new FormControl('',
      // Validators.required),
    }
    this.EvaluationForm = this.fb.group(formControls)
  }
    get commentaire() { return this.EvaluationForm.get('commentaire').value; }
    // get note() { return this.EvaluationForm.get('note'); }
    //set note(val){ this.EvaluationForm.setValue(val);}
    validateField(field: string) {
      return (
        this.EvaluationForm.get(field)?.invalid &&
        (this.EvaluationForm.get(field)?.touched || this.formSubmitted)
      );
    }
  setRating(value:number){
    this.rating=value;
  }

  getErrorMessage(field: string) {
    if (this.EvaluationForm.get(field)?.hasError('required')) {
      return 'Ce champ est obligatoire';
    }
    if (this.EvaluationForm.get(field)?.hasError('minlength')) {
      return 'Ce champ doit contenir au moins 4 caractères';
    }
    // Ajoutez d'autres messages d'erreur personnalisés si nécessaire
    return '';
  }

  onSubmit() {
    this.formSubmitted = true;
    console.log(this.EvaluationForm.value);
    let Idcompany=this.serviceUser.getUserIdFromToken()
    this.idEmployee = this.route.snapshot.params['id']
    let data = this.EvaluationForm.value;
    console.log(data);
    data.note=this.rating;
    
    let evaluation = new Evaluation(
      undefined,Idcompany, data.commentaire, data.note,this.idEmployee,
    );
    console.log(evaluation);

    if (
      data.commentaire == "" 
      ||data.note == 0
    ) {
      // Use MatSnackBar to show an error message
      this.snackBar.open('Remplir votre champs', 'Erreur', {
        duration: 3000, // Duration in milliseconds
        panelClass: ['error-snackbar'] // You can define your own styles for the snackbar
      });
    } else {
      this.services.addEvaluation(this.idEmployee,evaluation).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['back/ListEvaluation']);
          // Use MatSnackBar to show a success message
          this.snackBar.open('Evaluation ajoutée', 'Succès', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });


        },
        err => {
          console.log(err);
          // Use MatSnackBar to show an error message
          this.snackBar.open('Problème de Serveur', 'Erreur', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      );
    }
  }

}
