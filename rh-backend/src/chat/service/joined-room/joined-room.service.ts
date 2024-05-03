import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JoinedRoomI } from 'src/schemas/joined-room.interface';
import { JoinedRoom } from 'src/schemas/joined-room.schema';
import { RoomI } from 'src/schemas/room.interface';
import { UserI } from 'src/schemas/user.interface';

@Injectable()
export class JoinedRoomService {
 constructor(@InjectModel(JoinedRoom.name) private joinedRoomModel: Model<JoinedRoom>) {

 }
 async create(joinedRoom: JoinedRoomI) : Promise<any>

 {
    const newJoinedRoom = new this.joinedRoomModel(joinedRoom);
    return newJoinedRoom.save();

 }
 async findByUser(user: UserI)
 {
    return this.joinedRoomModel.find({ user }).exec();

 }
 async findByRoom(room: RoomI): Promise<any>
 {
    return this.joinedRoomModel.find({ room }).exec();

 }
 async deletBySockId(socketId: string)
 {
    await this.joinedRoomModel.deleteOne({ socketId });

 }
 async deleteAll()
 {
    await this.joinedRoomModel.deleteMany({});

 }

}
