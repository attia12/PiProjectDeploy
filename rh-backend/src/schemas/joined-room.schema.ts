import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./User.schema";
import { Room } from "./Room.schema";

@Schema()
export class JoinedRoom  {
  @Prop()
  socketId: string;

  @Prop({ type: 'ObjectId', ref: 'User' })
  user: User;

  @Prop({ type: 'ObjectId', ref: 'Room' })
  room: Room;
}

export const JoinedRoomSchema = SchemaFactory.createForClass(JoinedRoom);