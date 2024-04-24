import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./User.schema";
import { Room } from "./Room.schema";

@Schema()
export class Message {
  @Prop({ required: true })
  text: string;

  @Prop({ type: 'ObjectId', ref: 'User', required: true })
  user: User;

  @Prop({ type: 'ObjectId', ref: 'Room', required: true })
  room: Room;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
