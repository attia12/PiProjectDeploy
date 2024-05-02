import { Component, ViewChild, forwardRef } from '@angular/core';
import {FormGroup, FormBuilder, Validators, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import Swal from 'sweetalert2';
import { ContractService } from '../../services/contract.service';
import { AngularSignaturePadModule, NgSignaturePadOptions, SignaturePadComponent } from '@almothafar/angular-signature-pad';
import { SignaturePad } from 'ngx-signaturepad/signature-pad';

import { Router } from '@angular/router';
import { window } from 'rxjs';

@Component({
  selector: 'app-sendcontract',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AngularSignaturePadModule
  ],
  templateUrl: './sendcontract.component.html',
  styleUrl: './sendcontract.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SignaturePadComponent),
      multi: true
    }
  ]
})
export class SendcontractComponent {
  ContractForm: FormGroup;
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  onChange: any = () => {};
  onTouch: any = () => {};

  constructor(private formBuilder: FormBuilder, private contractService: ContractService) {
    this.ContractForm = this.formBuilder.group({
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      salaire: [0, Validators.required],
      type: ['', Validators.required],
      signature: [''] // Ajoutez un champ pour la signature
    });
  }



  onSubmit(): void {
    if (this.ContractForm.valid) {
      this.contractService.createContract(this.ContractForm.value).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Contrat envoyé avec succès',
          showConfirmButton: false,
          timer: 1500
        });
        this.ContractForm.reset();
      }, (error) => {
        console.error('Erreur lors de l\'envoi du contrat:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur est survenue lors de l\'envoi du contrat. Veuillez réessayer plus tard.',
        });
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Veuillez remplir tous les champs du contrat.',
      });
    }
  }

}
