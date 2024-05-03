import { Component } from '@angular/core';
import {NavBarComponent} from "../front-module/nav-bar/nav-bar.component";
import {FooterComponent} from "../front-module/footer/footer.component";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
