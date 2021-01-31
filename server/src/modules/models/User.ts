import { Service } from 'typedi';
import { Schema, model } from "mongoose";
import BaseModel from "./Base";
import { IUser, IUserInputDTO } from "../../lib/interfaces/IUser";


const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a full name"],
      index: true,
    },
  },
  { timestamps: true }
);

@Service()
class User extends BaseModel {
  get format() {
    const { name, _id: id } = this.transform;
    return { name, id };
  }
  static async add(user: IUserInputDTO) {
    const result = await this.create(user);
    return result.transform;
  }

  static async removeUser(id: string) {
    let result = await this.findOneAndRemove({ _id: id });
    if (!result) {
      throw new Error("Invalid id or user does not exist!");
    }
    return true;
  }

  static async updateUser(id: string, data: any) {
    console.log(id, data)
    let result = await this.findByIdAndUpdate(id, { ...data }, {new: true});
    if (!result) {
      throw new Error("Invalid id or user does not exist!");
    }
    return result.format;
  }

  static async filter({ name, page, limit }) {
    let q = {};
    if (name) {
      q["name"] = { $regex: ".*" + name + ".*" };
    }
    const records = await this.find({ ...q })
      .limit(Math.floor(limit))
      .skip(limit * (page - 1))
      .sort({ createdAt: -1 });
    const total = await this.countDocuments({
      ...q,
    });
    return {
      records: records.map((user) => user.format),
      total,
      pages: Math.ceil(total / 10),
      page,
      next: records.length > limit ? page + 1 : page ,
      previous: page <= 1 ? 1 : page - 1,
    };
  }
}

UserSchema.loadClass(User);
export default model<IUser>("User", UserSchema);
