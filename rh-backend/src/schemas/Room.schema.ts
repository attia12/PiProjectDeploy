import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./User.schema";




@Schema()
export class Room {
    @Prop({ required: true })
    name:string;
   
    description:string;
    @Prop() 
    createdAt: Date;
    @Prop({ type: [{ type: 'ObjectId', ref: 'User' }] }) 
    users: User[]; 

   


}
export const RoomSchema = SchemaFactory.createForClass(Room);