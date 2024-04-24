import { UserI } from "./user.interface";



export interface ConnectedUserI {
  _id?: string;
  socketId: string;
  user: UserI;
}