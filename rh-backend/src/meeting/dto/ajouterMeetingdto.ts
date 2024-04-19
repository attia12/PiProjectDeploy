import { IsNotEmpty } from "class-validator";

export class AjouterMeetingDto{
    @IsNotEmpty()
    lienMeet:string;
    @IsNotEmpty()
    dateDebut:Date;
    @IsNotEmpty()
    time:string;

}