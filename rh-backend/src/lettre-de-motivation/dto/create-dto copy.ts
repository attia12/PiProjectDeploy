import { FileInterceptor } from '@nestjs/platform-express/multer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LettreDeMotivationDto {
  @IsNotEmpty()
  @MinLength(50)
  description: string;
  cv: Express.Multer.File;
}