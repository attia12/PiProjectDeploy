/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/User.schema";
import * as bcrypt from 'bcrypt';


@Injectable()


export class UserSeedService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
    async seedUsers() {
        const usersToSeed = [
          { username: 'user1', email: 'user1@example.com', password: 'password1', roles: ['superadmin'], permissions: ['read:user'],verified:true },
          { username: 'user2', email: 'user2@example.com', password: 'password2', roles: ['company'], permissions: [],verified:true },
          
        ];
        for (const user of usersToSeed) {
            const existingUser = await this.userModel.findOne({ username: user.username });
            if (!existingUser) {
                const { password } = user;
                const hash = await this.hashPassword(password);
                 await this.userModel.create({ ...user, password: hash, hash });
            }
          }
      }
    
}