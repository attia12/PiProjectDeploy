import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AjoutTimeEntryComponent } from '../back-module/ajout-time-entry/ajout-time-entry.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private dialog: MatDialog) { }
   openPopup(selectedDate:any) {
    this.dialog.open(AjoutTimeEntryComponent,{
  data: { selectedDate: selectedDate }});
  }

  closePopup() {
    this.dialog.closeAll();
  }
}
