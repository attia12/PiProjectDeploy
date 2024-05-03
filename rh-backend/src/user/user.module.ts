/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AtStrategy } from 'src/strategies/at.strategy';
import { RtStrategy } from 'src/strategies/rt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { UserSeedService } from 'src/seed/UserSeedService';
import { EmailService } from './email/email.service';
import { OTP, OtpSchema } from 'src/schemas/Otp.schema';
import { GoogleStrategy } from 'src/strategies/google.strategy';
import { ClarifaiService } from './clarifai/clarifai.service';



@Module({
    imports: [MongooseModule.forFeature([
        { name: User.name,
            schema : UserSchema

        },
        { name: OTP.name,
            schema : OtpSchema

        },
       


    ]),JwtModule.register({}),
],
    providers: [UserService,AtStrategy,RtStrategy,UserSeedService, EmailService,GoogleStrategy, ClarifaiService],
    
    exports:[UserService],
    controllers: [UserController]
})
export class UserModule {
    constructor(private readonly userSeederService: UserSeedService) {
        this.seedData();
    
      }
      async seedData() {
        await this.userSeederService.seedUsers();
      }
}
