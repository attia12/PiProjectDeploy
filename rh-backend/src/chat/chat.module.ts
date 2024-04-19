import { Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';
import { UserModule } from 'src/user/user.module';
import { RoomService } from './service/room-service/room/room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from 'src/schemas/Room.schema';


@Module({
 
  imports:[ MongooseModule.forFeature([
  
    { name: Room.name,
        schema : RoomSchema

    },


]),UserModule],
  providers: [ChatGateway, RoomService]
})
export class ChatModule {}
