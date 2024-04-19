import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AjouterLettreComponent } from '../ajouter-lettre/ajouter-lettre.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [AjouterLettreComponent,RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

}
