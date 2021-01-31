import { Document } from "mongoose";

export interface IUser extends Document {
    _id: string;
    name: string;
    add(user:IUserInputDTO): Promise<any>
}
  
export interface IUserInputDTO {
    name: string;
}