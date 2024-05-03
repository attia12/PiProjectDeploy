import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { User } from "src/schemas/User.schema";


export class CreateTimeEntryDto{
    employee:string
    date:Date
    tempsDeTravail:string
    status:string
    justification:string
    
}