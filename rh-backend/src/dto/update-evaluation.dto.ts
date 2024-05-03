import { User } from "src/schemas/User.schema";
import { IsNumber, Max, Min } from "class-validator";


export class UpdateEvaluationDto{

     company:string;
    commentaire:string;
    @IsNumber()
    @Min(0)
    @Max(5)
    note:number;
    employee: string
}