import {inject, Injectable} from '@angular/core';
import {Socket} from "ngx-socket-io";
import {UserI} from "../user.interface";
import {RoomI, RoomPaginateI} from "../room.interface";

@Injectable({
  providedIn: 'root'
})
export class ChatService {


   constructor(private socket:Socket) { }
  sendMessage()
  {

  }
  getMessage()
  {
    return this.socket.fromEvent('message')

  }
  getMyRooms()
  {
    return this.socket.fromEvent<RoomPaginateI>('rooms');
  }
  createRoom()
  {
    // const user2:UserI = {
    //   _id:'65ee112e965770e8ea7d2176'
    // };
    // const room:RoomI = {
    //   name:'Testroom',
    //   users:[user2]
    // }
    // this.socket.emit('createRoom',room);
  }
  emitPaginateRooms(limit:number,page:number)
  {
    console.log("the limt send to backend ",limit)
    console.log("the number of page  send to backend ",page)

    this.socket.emit('paginateRoom',{limit,page})

  }
}
