import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationOptionsInterface } from 'src/schemas/PaginationOptionsInterface';

import { MessageI } from 'src/schemas/message.interface';
import { Message } from 'src/schemas/message.schema';
import { RoomI } from 'src/schemas/room.interface';


@Injectable()
export class MessageService {

    constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {


    }
    async create(message: MessageI): Promise<any> {
        const newMessage = new this.messageModel(message);
           return newMessage.save();
      }

      async findMessagesForRoom(room: RoomI, options: PaginationOptionsInterface): Promise<any> {
        const { page, limit } = options;
        const skip = (page - 1) * limit;

        try {
            const messages = await this.messageModel
                .find({ room: room._id })
                .populate('user')
                .populate('room')
                .skip(skip)
                .limit(limit)
                .sort({ created_at: -1 })
                .exec();

            return messages;
        } catch (error) {
            throw new Error(`Failed to find messages for room: ${error.message}`);
        }
    }
       
      }

   

