import {inject, Injectable} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {UserI} from "../user.interface";
import {RoomI, RoomPaginateI} from "../room.interface";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Observable, of } from 'rxjs';
import { MessageI, MessagePaginateI } from '../message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
 


   constructor(private socket:Socket,private snackbar:MatSnackBar) {
    
    }
    getAddedMessage():Observable<MessageI>
    {
      return this.socket.fromEvent<MessageI>('messageAdded')

    }
  sendMessage(message:any)
  {
    this.socket.emit('addMessage',message);

  }
  joinRoom(room:RoomI)
  {
    this.socket.emit('joinRoom',room);

  }
  leaveRoom(room:RoomI)
  {
    this.socket.emit('leaveRoom',room);

  }
  getMessages():Observable<any>
  {
    return this.socket.fromEvent<any>('messages');
  }
 
  
   getMyRooms()
   {
    return this.socket.fromEvent<RoomPaginateI>('rooms');
   }
  createRoom(room:RoomI)
  {
    
    console.log("this is after the submit before backend -------------",room)
    this.socket.emit('createRoom',room);
    this.snackbar.open(`Room ${room.name} created successfully`, 'Close', {
      duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
    });
  }
  
  emitPaginateRooms(limit:number,page:number)
  {
    console.log("the limt send to backend ",limit)
    console.log("the number of page  send to backend ",page)

    this.socket.emit('paginateRoom',{limit,page})

  }
}
