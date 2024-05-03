import { IsNumber, Max, Min } from "class-validator";
import { User } from "src/schemas/User.schema";


export class CreateEvaluationDto{
    company:string;
    commentaire:string;
    @IsNumber()
    @Min(0)
    @Max(5)
    note:number;
    employee: string
}