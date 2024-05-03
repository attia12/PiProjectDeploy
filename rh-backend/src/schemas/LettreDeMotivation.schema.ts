import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./User.schema";

@Schema()
export class LettreDeMotivation{
  @Prop({required: true})
  description:string;
  @Prop({ required: true}) 
  cv: string;
  @Prop({required:true,default:'false'})
  isVerified:boolean; 
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}
export const LettreDeMotivationSchema= SchemaFactory.createForClass(LettreDeMotivation);