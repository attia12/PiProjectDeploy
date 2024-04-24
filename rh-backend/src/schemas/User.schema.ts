/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Room } from "./Room.schema";
import { JoinedRoom } from "./joined-room.schema";
import { Message } from "./message.schema";


@Schema()
export class User {
    @Prop({ unique: true, required: true })
    username: string;
  
    @Prop({ 
        trim: true,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, "Valid email required"], })
   email: string;
   @Prop({ unique: true, required: true })
   password: string;
   @Prop({ required: false })
   hash?: string;
   @Prop({ required: false })
   hashedRt?: string;
   @Prop({ required: true, default: 'employee' }) 
   roles: string[];

   @Prop({ required: true, default: [] }) 
   permissions: string[];
   @Prop({ required: true, default: 'default_image.jpg' }) 
   image: string;
   @Prop({ type: [{ type: 'ObjectId', ref: 'Room' }] }) 
    rooms: Room[]; 
    @Prop({ required: true, default: false }) 
verified: boolean;
// @Prop({ required: true })
//   verificationToken: string;
@Prop()
verificationToken: string;

@Prop({ type: [{ type: 'ObjectId', ref: 'JoinedRoom' }] })
  joinedRooms: JoinedRoom[]; 

  @Prop({ type: [{ type: 'ObjectId', ref: 'Message' }] })
  messages: Message[];  



}
export const UserSchema = SchemaFactory.createForClass(User);