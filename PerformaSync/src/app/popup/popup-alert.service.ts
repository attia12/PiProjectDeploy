import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '../back-module/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class PopupAlertService {

  constructor(private dialog: MatDialog) { }
  openPopup() {
   this.dialog.open(AlertComponent);
 }

 closePopup() {
   this.dialog.closeAll();
 }
}
