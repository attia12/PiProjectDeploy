import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AjouterMeetingDto } from './dto/ajouterMeetingdto';
import { Meeting } from 'src/schemas/Meeting.schema';

@Injectable()
export class MeetingService {
    constructor(@InjectModel(Meeting.name) private readonly meetingModel:Model<Meeting> ){}
    async addMeeting(ajouterDto:AjouterMeetingDto,id:string) : Promise<Meeting> {
       const meeting = new this.meetingModel({
        lienMeet:ajouterDto.lienMeet,
        dateDebut:ajouterDto.dateDebut,
        time:ajouterDto.time,
        user:id
       });
       return meeting.save();
    }
 
    async findAllByUser(): Promise<Meeting[]> {
        return this.meetingModel.find().exec();
      }
      async findMeetByUser(userId:any)
      {
        return this.meetingModel.find({user:userId}).exec();
      }
}