import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { Evaluation } from 'src/schemas/evaluation.schema';
import { CreateEvaluationDto } from 'src/dto/create-evaluation.dto';
import { UpdateEvaluationDto } from 'src/dto/update-evaluation.dto';

@Controller('evaluation')
export class EvaluationController {
    constructor(private evaluationService : EvaluationService){}
    // @Post('addEvaluation')
    // addEvaluation(@Body() evaluation: CreateEvaluationDto): Promise<Evaluation> {
    //     return  this.evaluationService.create(evaluation)

    // }
    @Post('addEvaluation/:id')
    addEvaluation(@Param('id') id:string,@Body() evaluation: CreateEvaluationDto): Promise<Evaluation> {
        return  this.evaluationService.create(id,evaluation)

    }
    @Get('getAllEvaluations')
    getAllEvaluations() : Promise<Evaluation[]> {
        return  this.evaluationService.findAll();
    }
    @Get('getEvaluation/:id')
    getEvaluationById(@Param('id') id:string) : Promise<Evaluation> {
        return  this.evaluationService.findById(id);
    }
    @Put('updateEvaluation/:id')
    updateEvaluation(@Param('id') id:string,@Body() evaluation: UpdateEvaluationDto): Promise<Evaluation> {
        return  this.evaluationService.updateById(id , evaluation ) ;
    }

    @Delete('deleteEvaluation/:id')
    deleteEvaluationById(@Param('id') id:string) : Promise<Evaluation> {
        return this.evaluationService.deleteById(id);
    }
    @Get('getEvaluationsByEmployee/:employee')
    async findByEmployee(@Param('employee') employee: string): Promise<Evaluation[]> {
        return await this.evaluationService.findByEmployee(employee);
    }




@Get('average-ratings')
async getAllEmployeesAverageRatings(): Promise<{ employee: string; averageRating: number }[]> {
  try {
    const averageRatings = await this.evaluationService.getEmployeesAverageRatings();
    return averageRatings;
  } catch (error) {
    console.error('Error getting all employees average ratings:', error);
  }
}

}
