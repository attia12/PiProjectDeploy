import { Module } from '@nestjs/common';
import { TimeEntryController } from './time-entry.controller';
import { TimeEntryService } from './time-entry.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeEntrySchema } from 'src/schemas/timeEntry.schema';

@Module({
  imports:[MongooseModule.forFeature([{name : 'TimeEntry', schema : TimeEntrySchema}])],
  controllers: [TimeEntryController],
  providers:[TimeEntryService]

})
export class TimeEntryModule {}
