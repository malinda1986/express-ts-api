import { Model } from "mongoose";

export default class BaseModel extends Model {
  get transform() {
    return JSON.parse(JSON.stringify(this));
  }
}
