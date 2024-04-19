import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ChatService} from "./chat.service";
import {AsyncPipe, JsonPipe, NgForOf} from "@angular/common";
import {MatListOption, MatSelectionList, MatSelectionListChange} from "@angular/material/list";
import {MatCard} from "@angular/material/card";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";


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
    RouterLink
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit,AfterViewInit{
  rooms$=this.chatService.getMyRooms();
  selectedRoom=null;

  constructor(private chatService:ChatService) {
  }

  ngOnInit(): void {
    console.log(this.chatService.getMyRooms())
    this.chatService.createRoom();
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
