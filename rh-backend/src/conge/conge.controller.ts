import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { Conge } from 'src/schemas/conge.schema';
import { CongeService } from './conge.service';

@Controller('conge')
export class CongeController {

    constructor(private readonly appService: CongeService) {}

    @Post()
    async createConge(@Body() congeDto: Conge) {
      return this.appService.createConge(congeDto);
    }
  
    @Put('/:id')
    async updateConge(@Param('id') id: string, @Body() congeDto: Conge) {
      return this.appService.updateConge(id, congeDto);
    }
  
    @Delete('/:id')
    async deleteConge(@Param('id') id: string) {
      await this.appService.deleteConge(id);
      return { message: 'Conge deleted successfully' }; // Return a success message
    }
  
    @Get()
    async findAll() {
      return this.appService.findAll();
    }
  
    @Get('/:id')
    async findById(@Param('id') id: string) {
      const conge = await this.appService.findById(id);
      if (!conge) {
        throw new NotFoundException('Conge not found');
      }
      return conge;
    }
}
