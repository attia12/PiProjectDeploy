import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ChatService} from "./chat.service";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {MatListOption, MatSelectionList, MatSelectionListChange} from "@angular/material/list";
import {MatCard} from "@angular/material/card";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatError} from "@angular/material/form-field";
import {ChatRoomComponent} from "../chat-room/chat-room.component";
import { UserI } from '../user.interface';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    AsyncPipe,
    MatSelectionList,
    MatListOption,
    NgForOf,
    MatCard,
    MatPaginator,
    JsonPipe,
    MatButton,
    RouterLink,
    MatError,
    NgIf,
    ChatRoomComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit,AfterViewInit{
  rooms$=this.chatService.getMyRooms();
  user$:Observable<UserI | null>=this.userServcie.geLoggedInUser();

  selectedRoom=null;

  constructor(private chatService:ChatService,private userServcie:UserService) {

  }

  ngOnInit(): void {
    
   
    this.chatService.emitPaginateRooms(10,0);
  }


  onSelectRoom(event: MatSelectionListChange) {
    this.selectedRoom=event.source.selectedOptions.selected[0].value;

  }

  onPaginateRooms(event: PageEvent) {
    this.chatService.emitPaginateRooms(event.pageSize,event.pageIndex);

  }

  ngAfterViewInit(): void {
    this.chatService.emitPaginateRooms(10,0)
  }
}
