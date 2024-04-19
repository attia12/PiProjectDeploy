import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, Post, Put, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { LettreDeMotivationDto } from './dto/create-dto';
import { LettreDeMotivationService } from './lettre-de-motivation.service';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decoraot';
import { User } from 'src/schemas/User.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('lettre-de-motivation')
export class LettreDeMotivationController {
    constructor(private readonly lettreService: LettreDeMotivationService) {}

    @Post('insertion')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('cv'))
    async insererLettre(@UploadedFile() file: Express.Multer.File, @Body() lettreDto: LettreDeMotivationDto, @GetCurrentUser() user: any) {
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
        throw new BadRequestException('Invalid file format. Only JPEG, JPG, and PNG images are allowed.');
      }
      lettreDto.cv = file; 
      return this.lettreService.insererLettre(lettreDto,user.sub);
    }
    
  @Get('getLettres')
  async afficherLettres( ) {
    return this.lettreService.afficherToutesLettres();
  }
  @Delete('supprimer/:id')
  async deleteLettre(@Param('id') id:string) {
    return this.lettreService.supprimerLettre(id);
  }
  @Put('modifier/:id')
  async modifierLettre(@Param('id') id:string) {
    return this.lettreService.verifierLettre(id);
  }
}
