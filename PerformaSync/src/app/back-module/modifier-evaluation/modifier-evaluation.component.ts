import { Component } from '@angular/core';
import { EvaluationService } from '../../services/evaluation.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Evaluation } from '../../Model/Evaluation';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RatingsystemComponent } from '../ratingsystem/ratingsystem.component';

@Component({
  selector: 'app-modifier-evaluation',
  standalone: true,
  imports: [ReactiveFormsModule,
    FontAwesomeModule,
    RatingsystemComponent
],
  templateUrl: './modifier-evaluation.component.html',
  styleUrl: './modifier-evaluation.component.css'
})
export class ModifierEvaluationComponent {
  id: number
  EvaluationForm: FormGroup
  Evaluation: Evaluation
  formSubmitted = false;
faStar = faStar;
  rating=0

  constructor(private services: EvaluationService,private serviceUser: UserService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute// MatSnackBar injection
  ) {
    let formControls = {
      commentaire: new FormControl('',
      Validators.required),
      note: new FormControl('',
      Validators.required),
    }
    this.EvaluationForm = this.fb.group(formControls)
  }
    get commentaire() { return this.EvaluationForm.get('commentaire').value; }
    get note() { return this.EvaluationForm.get('note'); }

  // validateField(field: string) {
  //   return (
  //     this.EvaluationForm.get(field)?.invalid &&
  //     (this.EvaluationForm.get(field)?.touched || this.formSubmitted)
  //   );
  // }
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


  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    // this.id = idEvent;
    this.services.findEvaluationById(this.id).subscribe((result) => {
      let event = result;
      console.log(event);
      this.EvaluationForm.patchValue({
        commentaire: event.commentaire,
        note: event.note
      });
    });
  }

  updateEvaluation() {
    let data = this.EvaluationForm.value;
    data.note=this.rating;
        let Idcompany=this.serviceUser.getUserIdFromToken()

    let evaluation = new Evaluation(
      undefined,
      Idcompany,
      data.commentaire,
      data.note,
      Idcompany

    );
    console.log(Evaluation);
    console.log(data);
    this.services.updateEvaluation(this.id, evaluation).subscribe((res) => {
      console.log(res);
      this.router.navigate(['back/ListEvaluation'])

    });
  }


}
