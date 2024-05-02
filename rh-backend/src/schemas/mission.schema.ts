import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./User.schema";

@Schema()
export class Mission {
    @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: [{ type: 'ObjectId', ref: 'User' }] })
  assignedEmployees: User[]; 

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ default: 'pending' })
  status: string;
  @Prop({ type: 'ObjectId', ref: 'User' })
  assignedManager: User; 

  @Prop()
  location: string;
}
export const MissionSchema = SchemaFactory.createForClass(Mission);