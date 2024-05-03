import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { TimeEntry } from '../../Model/TimeEntry';
import { TimeEntryService } from '../../services/time-entry.service';
import { UserService } from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-modifier-time-entry',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  providers:[DatePipe],

  templateUrl: './modifier-time-entry.component.html',
  styleUrl: './modifier-time-entry.component.css'
})
export class ModifierTimeEntryComponent {
  TimeEntryForm: FormGroup
  formSubmitted = false;
  TimeEntry: TimeEntry
  id: string
  today=new Date().toString();

  constructor(private services: TimeEntryService,private serviceUser: UserService,  private router: Router, private fb: FormBuilder, private snackBar: MatSnackBar, private route: ActivatedRoute,private datePipe: DatePipe
  ) {
    let formControls = {
      TempsDeTravail :new  FormControl('',Validators.required),
      status :new  FormControl(null,Validators.required),
      justification :new  FormControl(null,Validators.required),

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

  ngOnInit(): void {

    let idEvent = this.route.snapshot.params['id'];
     this.id = idEvent;

    this.services.findTimeEntryById(this.id).subscribe((result) => {
      let event = result;
      console.log(event);
      this.TimeEntryForm.patchValue({
        employee:event.employee ,
        tempsDeTravail:event.tempsDeTravail,
        status:event.status,
        justification:event.justification
      });
    });
  }

   updateTimeEntry() {
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
    console.log(data);
    this.services.updateTimeEntry(this.id, timeEntry).subscribe((res) => {
      console.log(res);
      this.router.navigate(['back/ListTimeEntries'])

    });
  }

}
