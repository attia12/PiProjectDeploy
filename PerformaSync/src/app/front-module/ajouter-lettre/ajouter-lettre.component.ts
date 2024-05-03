import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { LettreService } from '../../services/lettre.service';
import { LettreDeMotivationDto } from '../../dto/lettre-de-motivation.dto';
import { Router } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-ajouter-lettre',
  standalone: true,
  imports: [ReactiveFormsModule,NavBarComponent,FooterComponent],
  templateUrl: './ajouter-lettre.component.html',
  styleUrl: './ajouter-lettre.component.css'
})
export class AjouterLettreComponent {
  lettreForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private lettreService: LettreService,private router:Router) {
    this.lettreForm = this.formBuilder.group({
      cv: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(50)]]
    });
  }

  get f() { return this.lettreForm.controls; }

  onSubmit() {
    if (this.lettreForm.invalid) {
      return;
    }

    const descriptionControl = this.lettreForm.get('description');
  const fileControl = this.lettreForm.get('cv');

  if (!descriptionControl || !fileControl) {
    console.error('Les contrôles de formulaire sont null');
    return;
  }

  const description = descriptionControl.value;
  const file: File = fileControl.value;
  const lettreDto = new LettreDeMotivationDto(description, file);

    this.lettreService.insererLettre(lettreDto)
      .subscribe(() => {
        console.log('Lettre insérée avec succès');
        this.lettreForm.reset();
        this.router.navigate(['front']).then(() => {
         window.location.reload()
       })
      }, (error) => {
        console.error('Erreur lors de l\'insertion de la lettre :', error);
      });
  }
  handleFileInput($event: any) {
    if ($event.target.files && $event.target.files.length > 0) {
      const file = $event.target.files[0];
      this.lettreForm.patchValue({
        cv: file
      });
      const fileControl = this.lettreForm.get('cv');
      if (fileControl) {
        fileControl.updateValueAndValidity();
      }
    }
  }

}

