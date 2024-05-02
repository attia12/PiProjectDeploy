import { Component } from '@angular/core';
import { PopupAlertService } from '../../popup/popup-alert.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  faclose=faClose

  constructor(private popupAlertService: PopupAlertService){}
closePopup() {
    this.popupAlertService.closePopup();
  }

}
