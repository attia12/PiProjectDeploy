import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';
import { UserModule } from 'src/user/user.module';
import { RoomService } from './service/room-service/room/room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from 'src/schemas/Room.schema';
import { ConnectedUserService } from './service/room-service/room/connected-user/connected-user.service';
import { ConnectedUser, ConnectedUserSchema } from 'src/schemas/connected-user.schema';
import { JoinedRoom, JoinedRoomSchema } from 'src/schemas/joined-room.schema';
import { Message, MessageSchema } from 'src/schemas/message.schema';
import { JoinedRoomService } from './service/joined-room/joined-room.service';
import { MessageService } from './service/message/message.service';


@Module({
 
  imports:[ MongooseModule.forFeature([
  
    { name: Room.name,
        schema : RoomSchema

    },
    { name: ConnectedUser.name,
      schema : ConnectedUserSchema

  },
  { name: JoinedRoom.name,
    schema : JoinedRoomSchema

},
{ name: Message.name,
  schema : MessageSchema

},


]),UserModule],
  providers: [ChatGateway, RoomService,ConnectedUserService,JoinedRoomService,MessageService]
})
export class ChatModule {}
