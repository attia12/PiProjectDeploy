import { Component, Input, OnInit } from '@angular/core';
import { MessageI } from '../message.interface';
import { UserI } from '../user.interface';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css'
})
export class ChatMessageComponent implements OnInit {
  @Input() message:any;
  // user$:Observable<UserI | null>=this.userService.geLoggedInUser();
  idUserLogin: any=this.userService.getUserIdFromToken();
  constructor(private userService:UserService)
  {

  }
  ngOnInit(): void {
   console.log("jhnjhjbjbjibh",this.idUserLogin)
  }

}
