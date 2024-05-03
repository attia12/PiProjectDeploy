import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { Mission } from 'src/schemas/mission.schema';


@Injectable()
export class MissionService {
    constructor(@InjectModel(Mission.name) private missionModel: Model<Mission>,@InjectModel(User.name) private userModel: Model<User>)
    {

    }
    async create(createMissionDto: any): Promise<Mission> {
        // const employeesExist = await Promise.all(
        //     createMissionDto.assignedEmployees.map(async (employeeId) => {
        //       const user = await this.userModel.findOne({ _id: employeeId });
        //       if (!user || !user.roles.includes('employee')) {
        //         throw new NotFoundException(`Employee with ID ${employeeId} not found or does not have the required role.`);
        //       }
        //       return true;
        //     }),
        //   );
      
          // Check if assigned manager exists and has required role
          if (createMissionDto.assignedManager) {
            const manager = await this.userModel.findOne({ _id: createMissionDto.assignedManager });
            if (!manager || !manager.roles.includes('company')) {
              throw new NotFoundException(`Manager with ID ${createMissionDto.assignedManager} not found or does not have the required role.`);
            }
          }
      
          // If all checks pass, create the mission
          const createdMission = new this.missionModel(createMissionDto);
          return createdMission.save();
        }
        async findAllMissionsByCompanyId(companyId: string): Promise<Mission[]> {
            
            const missions = await this.missionModel.find({ assignedManager: companyId })
            .populate('assignedEmployees') // Populate assignedEmployees field
        .populate('assignedManager') // Populate assignedManager field
        .exec();
            
            
            if (!missions) {
                throw new NotFoundException('Missions not found for this company.');
            }
            
            return missions;
        }
        async findAllMissionsPending():Promise<Mission[]>{
          const missions=await this.missionModel.find({status:"pending"})
          .populate('assignedEmployees') // Populate assignedEmployees field
        .populate('assignedManager') // Populate assignedManager field
        .exec();
          if (!missions) {
                throw new NotFoundException('Missions not found for this company.');
            }

            return missions;
        }
      
}
