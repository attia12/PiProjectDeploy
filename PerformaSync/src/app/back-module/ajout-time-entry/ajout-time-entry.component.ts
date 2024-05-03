import { Component } from '@angular/core';
import { TimeEntry } from '../../Model/TimeEntry';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { TimeEntryService } from '../../services/time-entry.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ajout-time-entry',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  providers:[DatePipe],
  templateUrl: './ajout-time-entry.component.html',
  styleUrl: './ajout-time-entry.component.css'
})
export class AjoutTimeEntryComponent {
  TimeEntryForm: FormGroup
  formSubmitted = false;
    today=new Date().toString();

    constructor(private services: TimeEntryService, private serviceUser: UserService, private router: Router, private fb: FormBuilder, private snackBar: MatSnackBar,private datePipe: DatePipe
  ) {
    let formControls = {

      tempsDeTravail :new  FormControl(null,Validators.required)
    }
    this.TimeEntryForm = this.fb.group(formControls)
  }

    validateField(field: string) {
      return (
        this.TimeEntryForm.get(field)?.invalid &&
        (this.TimeEntryForm.get(field)?.touched || this.formSubmitted)
      );
    }
  getErrorMessage(field: string) {
    if (this.TimeEntryForm.get(field)?.hasError('required')) {
      return 'Ce champ est obligatoire';
    }
    if (this.TimeEntryForm.get(field)?.hasError('minlength')) {
      return 'Ce champ doit contenir au moins 4 caractères';
    }
    // Ajoutez d'autres messages d'erreur personnalisés si nécessaire
    return '';
  }

  onSubmit() {
    this.formSubmitted = true;
    let data = this.TimeEntryForm.value;
    let IdEmployee=this.serviceUser.getUserIdFromToken()

    let timeEntry = new TimeEntry(
      undefined,
      IdEmployee,
      this.today,
      data.tempsDeTravail,
      data.status,
      data.justification,

    );
    console.log(timeEntry);

    if (
      data.tempsDeTravail == 0
    ) {
      // Use MatSnackBar to show an error message
      this.snackBar.open('Remplir votre champs', 'Erreur', {
        duration: 3000, // Duration in milliseconds
        panelClass: ['error-snackbar'] // You can define your own styles for the snackbar
      });
    } else {
      this.services.addTimeEntry(timeEntry).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['back/ListTimeEntries']);
          // Use MatSnackBar to show a success message
          this.snackBar.open('TimeEntry ajoutée', 'Succès', {
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
