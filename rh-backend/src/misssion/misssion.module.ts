import { Module } from '@nestjs/common';
import { MissionService } from './mission.service';
import { MisssionController } from './misssion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Mission, MissionSchema } from 'src/schemas/mission.schema';
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/schemas/User.schema';


@Module({
  imports:[MongooseModule.forFeature([
    { name: Mission.name,
        schema : MissionSchema

    },
    { name: User.name,
      schema : UserSchema

  },
    


]),UserModule],
  providers: [MissionService],
  controllers:[MisssionController]
})
export class MisssionModule {}
