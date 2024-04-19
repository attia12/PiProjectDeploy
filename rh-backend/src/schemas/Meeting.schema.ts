import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./User.schema";
@Schema()
export class Meeting{
    @Prop({required:true})
    lienMeet:string;
    @Prop({required:true,type:Date})
    dateDebut:Date;
    @Prop({required:true})
    time:string;
    @Prop({required:true,default:false})
    userIsAccepted:boolean;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}
export const MeetingSchema = SchemaFactory.createForClass(Meeting);