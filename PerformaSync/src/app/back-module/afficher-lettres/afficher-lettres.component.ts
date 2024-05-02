import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LettreService } from '../../services/lettre.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MeetingModalComponent } from '../meeting-modal/meeting-modal.component';


@Component({
  selector: 'app-afficher-lettres',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './afficher-lettres.component.html',
  styleUrl: './afficher-lettres.component.css'
})
export class AfficherLettresComponent implements OnInit {
  lettres: any = [];
  selectedDescription = '';

  constructor(private es: LettreService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadLettres();
  }
  loadLettres() {
    this.es.getLettres().subscribe((lettres) => {
      this.lettres = lettres;
      console.log("the lettre de motivation ",lettres)
    
    });
  }

  openDescriptionModal(description: string) {
    this.selectedDescription = description;
    this.dialog.open(ModalComponent, {
      width: '400px',
      data: { description: this.selectedDescription }
    });
  }

  openMeetingModal(id: string, userId: string) {
    this.dialog.open(MeetingModalComponent, {
      width: '400px',
      data: { id, userId }
    });
  }
}