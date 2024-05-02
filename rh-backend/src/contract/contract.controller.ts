import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ContractService } from './contract.service';

@Controller('contract')
export class ContractController {
    constructor(private readonly contractService: ContractService) {}
    @Post()
    async create(@Body() contract: any): Promise<any> {
        console.log('Received contract:', contract);
        return await this.contractService.createContract(contract);
    }
    @Put(':id/sign')
    async sign(@Param('id') id: string, @Body('signature') signature: string): Promise<any> {
        return await this.contractService.signContract(id, signature);
    }
}
