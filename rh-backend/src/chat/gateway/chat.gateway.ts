import { OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from '../service/room-service/room/room.service';
import { RoomI } from 'src/schemas/room.interface';
import { PaginationOptionsInterface } from 'src/schemas/PaginationOptionsInterface';
import { UserService } from 'src/user/user.service';
import { ConnectedUserService } from '../service/room-service/room/connected-user/connected-user.service';
import { ConnectedUserI } from 'src/schemas/conencted-user.interface';
import { JoinedRoomService } from '../service/joined-room/joined-room.service';
import { MessageService } from '../service/message/message.service';
import { MessageI } from 'src/schemas/message.interface';
import { JoinedRoomI } from 'src/schemas/joined-room.interface';

@WebSocketGateway({cors:{origin:['https://piprojectdeploy.onrender.com','https://hoppscotch.io','http://localhost:4200','http://localhost:3000']}})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect,OnModuleInit {
  @WebSocketServer()
  server:Server;
  
 
  constructor(private authService :UserService,private roomService :RoomService,private connectedUserService:ConnectedUserService,private joinedRoomService:JoinedRoomService,private messageService:MessageService )
  {

  }
  async onModuleInit() {
    await this.connectedUserService.deleteAll();
    await this.joinedRoomService.deleteAll();
  }
 
  
  async handleConnection(socket:Socket) {
    console.log('on connectt')
    try {
      const decodedToken=await this.authService.verifyJwt(socket.handshake.headers.authorization);
      console.log(decodedToken);
      const user:any=await this.authService.getUserById(decodedToken.sub);
      console.log("this is the user socket",user)
      if(!user)
      {
        //disconnect
        return this.disconnect(socket);

      }else {
        socket.data.user=user;

      const { items, meta } = await this.roomService.getRoomsForUser(user._id, { page: 1, limit: 10 });
     // meta.currentPage=meta.currentPage-1;
     meta.currentPage = Math.max(meta.currentPage - 1, 0);
      const roomPaginate: any = { items: items, meta: meta };
      //console.log("the roompaginator send to front", roomPaginate);
      // save connection to database 

      await this.connectedUserService.create({
        socketId:socket.id,
        user
      })



      
      return this.server.to(socket.id).emit('rooms', roomPaginate);
        
        

      }

    }catch
    {
      return this.disconnect(socket);

    }
   
  }
  async handleDisconnect(socket: Socket) {
    console.log('disconenct')
    //remove connection from db
    await this.connectedUserService.deleteSocketById(socket.id);
    
    socket.disconnect();
 
   }
  private disconnect(socket:Socket)
  {
    socket.emit('Error',new UnauthorizedException());
    socket.disconnect();
  }
  @SubscribeMessage('createRoom')
  async onCreateRoom(socket:Socket,room:RoomI)
  {
    //return this.roomService.createRoom(room,socket.data.user)
    const createdRoom:RoomI=await this.roomService.createRoom(room,socket.data.user)
    console.log("created room--------",createdRoom);
     for(const user of createdRoom.users)
       {
         const connections: ConnectedUserI[]=await this.connectedUserService.findByUser(user)
         console.log("----------connection ",connections)
        const rooms=await this.roomService.getRoomsForUser(user._id,{page:1,limit:10});
         for(const connection of connections)
          {
            await this.server.to(connection.socketId).emit('rooms',rooms);

           }
      }

  }
  @SubscribeMessage('paginateRoom')
  async onPaginateRoom(socket: Socket,page:PaginationOptionsInterface)
  {
    page.limit=page.limit > 100 ? 100 : page.limit;

    page.page=page.page+1;
    const rooms: RoomI[] = await this.roomService.getRoomsForUser(socket.data.user._id,page);
    return this.server.to(socket.id).emit('rooms',rooms);
    

  }
 @SubscribeMessage('joinRoom')
 async onJoinRoom(socket: Socket,room:RoomI)
 {
  const messages=await this.messageService.findMessagesForRoom(room,{limit:10,page:1});
  console.log("message from the backend ---------",messages)
  //messages.meta.currentPage=messages.meta.currentPage -1 ;
  //save conenction to room
  await this.joinedRoomService.create({socketId:socket.id,user:socket.data.user,room});
  //send last ùmessage from room to user
  await this.server.to(socket.id).emit('messages',messages);


 }
 @SubscribeMessage('leaveRoom')
 async onLeaveRoom(socket: Socket)
 {
  //remove connection from Joined room
  await this.joinedRoomService.deletBySockId(socket.id);

 }
 @SubscribeMessage('addMessage')
 async onAddMessage(socket: Socket,message:MessageI)
 {
  const createdMessage:MessageI=await this.messageService.create({...message,user : socket.data.user});
  const room:RoomI=await this.roomService.getRoom(createdMessage.room._id);
  const joinedUsers: JoinedRoomI[]=await this.joinedRoomService.findByRoom(room);
  // send new message to all joined Users of the room (currenctly online)
  for(const user of joinedUsers)
    {
      await this.server.to(user.socketId).emit('messageAdded',createdMessage);

    }

 }

 
}
