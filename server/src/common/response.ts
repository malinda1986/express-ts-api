import { boolean } from "joi";

export default class Http {
  static createResponse(data: any, code = 200) {
    const successCodes = [200, 201];
    return {
      success: successCodes.includes(code) ? true : false,
      data: typeof data === "boolean" ? {} : data,
    };
  }
}
