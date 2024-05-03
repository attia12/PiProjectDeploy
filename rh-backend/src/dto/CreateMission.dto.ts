import { Type } from "class-transformer";
import {  IsOptional, IsString } from "class-validator";

export class CreateMissionDto {
    @IsString()
    title: string;
  
    @IsString()
    @IsOptional()
    description?: string;
  
    
    @Type(() => String)
    assignedEmployees: string[]; // Assuming you pass array of user ids
  
   
    startDate: Date;
  
    
    endDate: Date;
  
    @IsString()
    @IsOptional()
    status?: string;
  
    @IsString()
    @IsOptional()
    assignedManager?: string; // Assuming you pass user id
  
    @IsString()
    @IsOptional()
    location?: string;
  }