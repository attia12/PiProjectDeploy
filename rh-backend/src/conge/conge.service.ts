import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import {  Conge } from 'src/schemas/conge.schema';

@Injectable()
export class CongeService {

    constructor(
        @InjectModel(Conge.name) private readonly congeModel: Model<Conge>,
      ) {}
    
     
      async createConge(conge: Conge): Promise<Conge> {
        const newConge = new this.congeModel(conge);
        return newConge.save();
      }
    
      async updateConge(id: string, conge: Conge): Promise<Conge | null> {
        const existingConge = await this.congeModel.findByIdAndUpdate(id, conge, {
          new: true,
        });
        if (!existingConge) {
          throw new NotFoundException('Conge not found');
        }
        return existingConge;
      }
    
      async deleteConge(id: string): Promise<void> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new BadRequestException('Invalid congé ID');
        }
    
        const deletedConge = await this.congeModel.findByIdAndDelete(id);
        if (!deletedConge) {
          throw new NotFoundException('Conge not found');
        }
      }
    
      async findAll(): Promise<Conge[]> {
        return await this.congeModel.find();
      }
    
      async findById(id: string): Promise<Conge | null> {
        return await this.congeModel.findById(id);
      }
}
