import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LettreDeMotivation } from 'src/schemas/LettreDeMotivation.schema';
import { LettreDeMotivationDto } from './dto/create-dto';

@Injectable()
export class LettreDeMotivationService {
    constructor(@InjectModel(LettreDeMotivation.name) private readonly lettreModel: Model<LettreDeMotivation>) {}

    async insererLettre(lettreDto: LettreDeMotivationDto,userId: string): Promise<LettreDeMotivation> {
      const lettre = new this.lettreModel({
        description: lettreDto.description,
        cv: lettreDto.cv.buffer,
        user:userId
      });
      return lettre.save();
    }
    async afficherToutesLettres(): Promise<LettreDeMotivation[]> {
        return await this.lettreModel.find().populate('user').exec();
      }
      async supprimerLettre(id:string): Promise<LettreDeMotivation[]> {
        return await this.lettreModel.findByIdAndDelete(id);
      }
      async verifierLettre(id: string): Promise<LettreDeMotivation> {
        const lettre = await this.lettreModel.findByIdAndUpdate(id, { isVerified: true }, { new: true });
        if (!lettre) {
          throw new NotFoundException(`Lettre de motivation introuvable avec l'ID ${id}`);
        }
        return lettre;
      }
      
    async getLettreDeMotivationByUser(userId: string): Promise<LettreDeMotivation | null> {
      return this.lettreModel.findOne({ user: userId }).exec();
  }
  
}
