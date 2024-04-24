import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { RoomI } from '../room.interface';
import { ChatService } from '../chat/chat.service';
import { Observable, combineLatest, map, startWith, take, tap } from 'rxjs';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { text } from '@fortawesome/fontawesome-svg-core';
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {ChatMessageComponent} from "../chat-message/chat-message.component";
import {MatInput} from "@angular/material/input";
import { MessageI, MessagePaginateI } from '../message.interface';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [
    NgIf,
    MatError,
    DatePipe,
    MatIcon,
    NgForOf,
    AsyncPipe,
    ChatMessageComponent,
    MatFormField,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.css'
})
export class ChatRoomComponent implements OnInit,OnChanges,OnDestroy,AfterViewInit {
  @Input() chatRoom:RoomI;
  @ViewChild('messages') private messagesScroller: ElementRef;
  messages$ :Observable<MessageI[]>=combineLatest([this.chatService.getMessages(), this.chatService.getAddedMessage().pipe(startWith(null))]).pipe(
    map(([messages,message])=>{
      console.log("this is the message -----",message)
      if(message  && message.room === this.chatRoom._id){
        messages.push(message);
      }
        return messages.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
       }
  ),tap(()=>this.scrollToBottom()))
  // messages$ :Observable<MessageI[]>=this.chatService.getMessages().pipe(map((messages:MessageI[])=>{
  //   return messages.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  // }
  // ))
  
  //  messages$ :Observable<MessageI[]>=this.chatService.getMessages().pipe(map((messagePaginate :MessagePaginateI)=>{
  //   const items=messagePaginate.items.sort((a,b)=>new Date(a.created_at).getTime()-new Date(b.created_at).getTime())
  //    messagePaginate.items=items;
  //    return messagePaginate;
  //  }));
  chatMessage: FormControl = new FormControl(null, [Validators.required]);
  constructor(private chatService:ChatService)
  {

  }
  ngAfterViewInit(): void {
    if (this.messagesScroller) {
      this.scrollToBottom();
    }
  }
  ngOnInit(): void {
   console.log("this chatt room messaage front end ",this.messages$)
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.chatRoom)
      {
        this.chatService.joinRoom(this.chatRoom);
      }
  }
  ngOnDestroy(): void {
    this.chatService.leaveRoom(this.chatRoom);
  }
  sendMessage()
  {
    this.chatService.sendMessage({text: this.chatMessage.value,room : this.chatRoom});
    this.chatMessage.reset();

  }

  scrollToBottom(): void {
    try {
      setTimeout(() => { this.messagesScroller.nativeElement.scrollTop = this.messagesScroller.nativeElement.scrollHeight }, 1);
    } catch { }

  }

}
