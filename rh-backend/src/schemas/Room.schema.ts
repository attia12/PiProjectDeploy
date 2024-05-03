import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./User.schema";
import { Types } from "mongoose";
import { Message } from "./message.schema";




@Schema()
export class Room {
    @Prop({ required: true })
    name:string;
    @Prop({ required: true })
   
    description:string;
    @Prop({ default: Date.now })
    created_at: Date;
   
    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  users: Types.ObjectId[]; 


  @Prop({ type: [{ type: 'ObjectId', ref: 'Message' }] })
  messages: Message[]; 

   


}
export const RoomSchema = SchemaFactory.createForClass(Room);