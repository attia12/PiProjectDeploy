import { Component, Inject } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { LettreService } from '../../services/lettre.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LettreDeMotivationDto } from '../../dto/lettre-de-motivation.dto';
import {NgIf} from "@angular/common";



@Component({
  selector: 'app-submit-candidate-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf

  ],
  templateUrl: './submit-candidate-modal.component.html',
  styleUrl: './submit-candidate-modal.component.css'
})
export class SubmitCandidateModalComponent {
  lettreForm = this.formBuilder.group({
    cv: [null as File | null, Validators.required],
    description: ['', [Validators.required, Validators.minLength(50)]]
  });
  lettreInserer: boolean = false;

  constructor(private formBuilder: FormBuilder, private lettreService: LettreService, private router: Router, private userService: UserService) {}

  ngOnInit(): void {

        const userId = this.userService.getUserIdFromToken();
        console.log('User ID:', userId);
        if (userId) {
          this.lettreService.getLettreDeMotivationByUser(userId).subscribe(
            (response) => {
              this.lettreInserer = response !== null;
              console.log('Lettre insérée:', this.lettreInserer);
            },
            (error) => {
              console.error('Erreur lors de la récupération de la lettre de motivation :', error);
            }
          );
        };
  }

  onSubmit(): void {
    if (this.lettreForm.invalid || this.lettreInserer || this.lettreForm.get('cv').value === null) {
      console.error('Formulaire invalide ou aucun fichier sélectionné');
      return;
    }
  
    const description = this.lettreForm.get('description')?.value;
    const file: File = this.lettreForm.get('cv').value;
    const lettreDto = new LettreDeMotivationDto(description, file);
  
    this.lettreService.insererLettre(lettreDto).subscribe(
      () => {
        console.log('Lettre insérée avec succès');
        this.lettreForm.reset();
        this.router.navigate(['back']).then(() => {
          window.location.reload();
        });
        this.lettreService.setLettreInserer(true);
        this.lettreInserer = true;
      },
      (error) => {
        console.error('Erreur lors de l\'insertion de la lettre :', error);
      }
    );
  }

  handleFileInput(event: any): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.lettreForm.patchValue({
        cv: file
      });
    }
  }


}
