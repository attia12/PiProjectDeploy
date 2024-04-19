import { Module } from '@nestjs/common';
import { MeetingController } from './meeting.controller';
import { MeetingService } from './meeting.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Meeting, MeetingSchema } from 'src/schemas/Meeting.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Meeting.name, schema: MeetingSchema }])],
  controllers: [MeetingController],
  providers: [MeetingService]
})
export class MeetingModule {}
