import { RoomI } from "./room.interface";
import { UserI } from "./user.interface";

export interface JoinedRoomI {
    id?: string;
    socketId: string;
    user: UserI;
    room: RoomI;
  }