import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./User.schema";
enum Type {
    CDD='CDD(Fixed-term contract)',
    CDI='CDI(Permanent contract)',
    
  }
@Schema()
export class Contract{
    @Prop({required:true,type:Date})
    dateDebut:Date;
    @Prop({required:true,type:Date})
    dateFin:Date;
    @Prop({required:true})
    salaire:number;
    @Prop({ required: true, enum: Object.values(Type) })
    type: Type;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}
export const ContractSchema = SchemaFactory.createForClass(Contract);