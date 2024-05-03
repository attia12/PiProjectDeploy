import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LettreService } from '../../services/lettre.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { MeetingModalComponent } from '../meeting-modal/meeting-modal.component';
import {FaIconComponent, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-afficher-lettres',
  standalone: true,
  imports: [FormsModule, CommonModule,FaIconComponent],
  templateUrl: './afficher-lettres.component.html',
  styleUrl: './afficher-lettres.component.css'
})
export class AfficherLettresComponent implements OnInit {
   faVideo=faVideo;
  faDeleteLeft=faDeleteLeft
  isLoading=true
  lettres: any=[];
  selectedDescription = '';
  showMeetingModal: boolean = false;
  showModalBox = false;
  meetingFormModel: any = {
    lienMeet: '',
    dateDebut: '',
    time: ''
  };
  selectedUserId: string = '';

  constructor(private es: LettreService){};
  
  ngOnInit(): void {
    this.loadLettres();
  }

  loadLettres() {
    this.es.getLettres().subscribe((lettres) => {
      this.lettres = lettres;
      this.lettres.forEach((l:any) => {
        this.es.getUserName(l.user).subscribe((user) => {
          l.userName = user.username;
          this.isLoading = false;
        });
      });
    });
  }
  
  delete(id: string) {
    this.es.deleteLettre(id).subscribe(() => {
      console.log("deleted successfully");
      this.loadLettres();
    }, error => {
      console.log(error);
    });
  }

  openMeetingModal(id: string, userId: string) {
    this.selectedUserId = userId;
    
    this.showMeetingModal = true;
    console.log(this.showMeetingModal);
  }

  closeMeetingModal() {
    this.showMeetingModal = false;
  }

  submitMeetingForm() {
    this.es.sendMeet(this.meetingFormModel, this.selectedUserId).subscribe(() => {
      console.log('Meeting scheduled successfully');
      this.meetingFormModel = {
        lienMeet: '',
        dateDebut: '',
        time: ''
      };
      this.showMeetingModal = false;
    }, error => {
      console.error('Error scheduling meeting:', error);
    });
  }

  confirmDelete(id: string) {
    if (confirm('Are you sure you want to delete this letter?')) {
      this.delete(id);
    }
  }
  closeModal() {
    this.showModalBox = false;
  }
  showModal(description: string) {
    this.selectedDescription = description;
    this.showModalBox = true; // Assurez-vous que showModalBox est correctement défini dans votre composant
  }
}