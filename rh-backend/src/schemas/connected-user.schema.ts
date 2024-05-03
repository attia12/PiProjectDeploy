import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./User.schema";

@Schema()

export class ConnectedUser {
  @Prop({ required: true })
  socketId: string;

  @Prop({ type: 'ObjectId', ref: 'User' })
  user: User;
}

export const ConnectedUserSchema = SchemaFactory.createForClass(ConnectedUser);
