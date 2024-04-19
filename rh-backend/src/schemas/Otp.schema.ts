/* eslint-disable prettier/prettier */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";





@Schema({ timestamps: true })
export class OTP {
    @Prop({ required: true })
    otp: number;

    @Prop({ required: true })
    email: string;
    @Prop({ type: Date, expires: 300 }) 
    createdAt: Date;

   


}
export const OtpSchema = SchemaFactory.createForClass(OTP);