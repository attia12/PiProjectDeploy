import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import * as mongoose from 'mongoose';
import { User } from "./User.schema";



@Schema({
    timestamps: true
})
export class Evaluation{
    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    // company:User
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
    company: User|string;
    @Prop()
    commentaire:string
    @Prop()
    note: number

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    // employee:User
     @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
    employee: User | string;
    

}
export const EvaluationSchema = SchemaFactory.createForClass(Evaluation)