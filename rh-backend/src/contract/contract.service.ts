import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContractDto } from 'src/dto/contract.dto';
import { Contract } from 'src/schemas/Contract.schema';

@Injectable()
export class ContractService {
    constructor(@InjectModel(Contract.name) private contractModel: Model<Contract>) {}

    async createContract( contract:ContractDto): Promise<Contract> {
        const newContract = new this.contractModel({ dateDebut:contract.dateDebut, dateFin:contract.dateFin, salaire:contract.salaire, type:contract.type, signature:contract.signature });
        return await newContract.save();
    }
    async signContract(contractId: string, signature: string): Promise<Contract> {
        return await this.contractModel.findByIdAndUpdate(contractId, { signature }, { new: true });
    }
}
