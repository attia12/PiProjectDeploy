import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { AuthGuard } from '@nestjs/passport';
import { AjouterMeetingDto } from './dto/ajouterMeetingdto';
import { Meeting } from 'src/schemas/Meeting.schema';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decoraot';

@Controller('meeting')
export class MeetingController {
    constructor(private readonly meetingSerivce:MeetingService){}
    @Post('envoyerMeet/:id')
    @UseGuards(AuthGuard('jwt'))
    async sendMeet(@Body() meetDto:AjouterMeetingDto,@Param('id') id:string){
        return this.meetingSerivce.addMeeting(meetDto,id);
    }
    
  @Get('meets')
  async findAllByUser(): Promise<Meeting[]> {
    return this.meetingSerivce.findAllByUser();
  }
  @Get('meetByUser/:userId')
  async findMeetByUser(@Param('userId') userId :string): Promise<Meeting[]> {
    return this.meetingSerivce.findMeetByUser(userId);
  }
  
}
