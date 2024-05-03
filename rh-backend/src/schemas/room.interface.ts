import { UserI } from "./user.interface";

export interface RoomI {
    _id?:string;
    name?:string;
    description:string;
    users?: UserI[];
    created_at?:Date;

}