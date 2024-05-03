import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { Conge, CongeSchema } from 'src/schemas/conge.schema';
import { CongeService } from './conge.service';
import { CongeController } from './conge.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Conge.name, schema: CongeSchema }]),
  ],
  providers: [CongeService],
  controllers: [CongeController]
})
export class CongeModule {}
