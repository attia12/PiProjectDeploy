import {UserI} from "./user.interface";
import { Meta } from "./meta.interface";

export interface RoomI {
  _id?: string;
  name?: string;
  description?: string;
  users?: UserI[];
  created_at?: Date;

}

export interface RoomPaginateI {
  items: RoomI[];
  meta: Meta;
}
