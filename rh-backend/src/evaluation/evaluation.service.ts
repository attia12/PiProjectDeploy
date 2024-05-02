import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from "mongoose";
import { Evaluation } from 'src/schemas/evaluation.schema';

@Injectable()
export class EvaluationService {
    constructor(
        @InjectModel(Evaluation.name)
        private EvaluationModel : mongoose.Model<Evaluation>
    ){}

    async findAll(): Promise<Evaluation[]> {
        const  evaluations = await this.EvaluationModel.find()
        return evaluations;
    }
    // async create(evaluation: Evaluation): Promise<Evaluation> {
    //     const  newEvaluation = await this.EvaluationModel.create(evaluation);
    //     return  newEvaluation;
    // }
    async create(id:string,evaluation: Evaluation): Promise<Evaluation> {
      const  newEvaluation = await this.EvaluationModel.create(evaluation);
      newEvaluation.$set('employee',id)
      return  newEvaluation;
  }
     async findById(id: string): Promise<Evaluation> {
        const  newEvaluation = await this.EvaluationModel.findById(id);
        if(!newEvaluation){
                throw new NotFoundException('This evaluation does not exist');
        }
        return  newEvaluation;
    }
    
    async updateById(id: string,updateEvaluation:Evaluation): Promise<Evaluation> {
        return await this.EvaluationModel.findByIdAndUpdate(id,updateEvaluation,{
            new:true,
            runValidators:true
        });
       
    }
    async deleteById(id: string): Promise<Evaluation> {
        return await this.EvaluationModel.findByIdAndDelete(id);
       
    }

    async findByEmployee(employee: string): Promise<Evaluation[]> {
        return await this.EvaluationModel.find({ employee });
    }

    async search(searchText: string): Promise<Evaluation[]> {
    const searchRegex = new RegExp(searchText, 'i'); // Case-insensitive search
    return await this.EvaluationModel.find({
      $text: { $search: searchText },
    });
  }
//   async findAllByEmployee(): Promise<Evaluation[]> {
//         const  evaluations = await this.EvaluationModel.
//         return evaluations;
//     }


// 


async getEmployeesAverageRatings(): Promise<{ employee: string; averageRating: number }[]> {
  try {
    const result = await this.EvaluationModel.aggregate([
      {
        $group: {
          _id: '$employee', 
        // Group by company name
          averageRating: { $avg: '$note' }, // Calculate average rating
        },
      },
      {
        $project: {
          _id: 0, // Exclude unnecessary _id field
          // employee: '$_id', // Assign company name from the group key
        employee: '$_id',
        // Group by company name

          averageRating: 1, // Replace with 1 to maintain the existing behavior
        },
      },
    ]);
    return result.map((item) => ({ employee: item.employee,username: item.username, averageRating: item.averageRating }));
  } catch (error) {
    console.error('Error getting all companies average ratings:', error);
    throw error; // Re-throw for further handling
  }
}
}
