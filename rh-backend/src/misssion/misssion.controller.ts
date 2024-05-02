import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateMissionDto } from 'src/dto/CreateMission.dto';
import { MissionService } from './mission.service';




@Controller('misssion')
export class MisssionController {
    constructor(private missionService:MissionService)
    {

    }
    
    
    @Post()
    async create(@Body() createMissionDto: CreateMissionDto) {
    try {
      const mission = await this.missionService.create(createMissionDto);
      return { mission };
    } catch (error) {
      return { error: error.message }; // Return error message if mission creation fails
    }
  }
  @Get('/company/:companyId')
  async getMissionsByCompanyId(@Param('companyId') companyId: string) {
      const missions = await this.missionService.findAllMissionsByCompanyId(companyId);
      return missions;
  }
  @Get('/missionPending')
  async getMissionsPending() {
      const missions = await this.missionService.findAllMissionsPending();
      return missions;
  }
}
