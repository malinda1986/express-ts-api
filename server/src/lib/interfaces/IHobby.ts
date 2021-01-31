import { Document } from "mongoose";

export interface IHobby extends Document {
    _id: string;
    passionLevel: string;
    name: string;
    year: string;
    user: string;
}
  
export interface IHobbyInputDTO {
    passionLevel: string;
    name: string;
    year: string;
    user: string;
}