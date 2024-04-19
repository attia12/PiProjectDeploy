import { UnauthorizedException } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomService } from '../service/room-service/room/room.service';
import { RoomI } from 'src/schemas/room.interface';
import { PaginationOptionsInterface } from 'src/schemas/PaginationOptionsInterface';
import { UserService } from 'src/user/user.service';

@WebSocketGateway({cors:{origin:['https://hoppscotch.io','http://localhost:4200','http://localhost:3000']}})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server:Server;
  
 
  constructor(private authService :UserService,private roomService :RoomService)
  {

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
      console.log("the roompaginator send to front", roomPaginate);
      
      return this.server.to(socket.id).emit('rooms', roomPaginate);
        
        

      }

    }catch
    {
      return this.disconnect(socket);

    }
   
  }
  handleDisconnect(socket: Socket) {
    console.log('disconenct')
    
    socket.disconnect();
 
   }
  private disconnect(socket:Socket)
  {
    socket.emit('Error',new UnauthorizedException());
    socket.disconnect();
  }
  @SubscribeMessage('createRoom')
  async onCreateRoom(socket:Socket,room:RoomI):Promise<RoomI>
  {
    return this.roomService.createRoom(room,socket.data.user)

  }
  @SubscribeMessage('paginateRoom')
  async onPaginateRoom(socket: Socket,page:PaginationOptionsInterface)
  {
    page.limit=page.limit > 100 ? 100 : page.limit;

    page.page=page.page+1;
    const rooms: RoomI[] = await this.roomService.getRoomsForUser(socket.data.user._id,page);
    return this.server.to(socket.id).emit('rooms',rooms);
    

  }
 
}
