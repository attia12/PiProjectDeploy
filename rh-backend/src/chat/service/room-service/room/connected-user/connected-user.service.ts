import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConnectedUserI } from 'src/schemas/conencted-user.interface';
import { ConnectedUser } from 'src/schemas/connected-user.schema';
import { UserI } from 'src/schemas/user.interface';

@Injectable()
export class ConnectedUserService {
 constructor(@InjectModel(ConnectedUser.name) private connectUserModel: Model<ConnectedUser>)

 {

 }
 async create(connectedUser:ConnectedUserI):Promise<any>
 {
    const newUser = new this.connectUserModel(connectedUser);
    return await newUser.save();
 }
 async findByUser(user:UserI): Promise<any>
 {
    return this.connectUserModel.find({ 'user': user._id }).exec();


 }
 async deleteSocketById(socketId: string): Promise<any> {
    return this.connectUserModel.deleteMany({ socketId });
  }

  async deleteAll(): Promise<any> {
    return this.connectUserModel.deleteMany({});
  }
 

}
