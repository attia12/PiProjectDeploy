import { Module } from '@nestjs/common';
import { EvaluationController } from './evaluation.controller';
import { EvaluationService } from './evaluation.service';
import { EvaluationSchema } from 'src/schemas/evaluation.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{name : 'Evaluation', schema : EvaluationSchema}])],
  controllers: [EvaluationController],
  providers: [EvaluationService]
})
export class EvaluationModule {}
