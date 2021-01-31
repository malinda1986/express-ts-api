import { IHobby, IHobbyInputDTO } from "../../lib/interfaces/IHobby";
import { Schema, model } from "mongoose";
import BaseModel from "./Base";

const HobbySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
      index: true,
    },
    passionLevel: {
      type: String,
      enum: ["Very-High", "High", "Medium", "Low"],
      required: [true, "Please enter a passion level"],
    },
    year: {
      type: String,
      required: [true, "Please enter a year"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

class Hobby extends BaseModel {

  get format() {
    const { name, year, passionLevel, user, _id: id } = this.transform;
    return { name, year, id, user, passionLevel };
  }

  static async add(hobby: IHobbyInputDTO) {
    const result = await this.create(hobby);
    return result.format;
  }
  static async updateHobby(id:string, hobby: IHobbyInputDTO) {
    const result = await this.findByIdAndUpdate(id, {...hobby}, {new: true});
    return result.transform;
  }
  static async removeHobbiesByUser(id: string) {
    const result = await this.deleteMany({ user: id });
    if (!result) {
      throw new Error("Invalid user id or hobby does not exist!");
    }
    return true;
  }

  static async removeHobby(id: string) {
    let result = await this.findOneAndRemove({ _id: id });
    if (!result) {
      throw new Error("Invalid id or hobby does not exist!");
    }
    return true;
  }

  static async filter({ name, year, passion_level, user, page, limit }) {
    let q = {};
    if (name) {
      q["name"] = { $regex: ".*" + name + ".*" };
    }
    if (passion_level) {
      q["passionLevel"] = passion_level;
    }
    if (year) {
      q["year"] = year;
    }
    if (user) {
      q["user"] = user;
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

HobbySchema.loadClass(Hobby);
export default model<IHobby>("Hobby", HobbySchema);
