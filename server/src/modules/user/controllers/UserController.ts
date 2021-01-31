import {
  JsonController,
  Get,
  QueryParam,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from "routing-controllers";
import { Container } from "typedi";
import Joi from "joi";
import { IUserService } from "../../../lib/interfaces";

import UserService from "../services/UserService";
import { IUserDTO } from "../../../lib/dto";
import Http from "../../../common/response";

@JsonController()
export class UserController {
  private userService: IUserService;

  constructor() {
    this.userService = Container.get(UserService);
  }

  @Post("")
  async create(@Body() user: IUserDTO) {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
      });
      await schema.validateAsync(user);

      const registerResponse = await this.userService.create(user);
      return Http.createResponse(registerResponse, 201);
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  @Get("")
  async get(
    @QueryParam("name") name: string,
    @QueryParam("page") page: number = 1,
    @QueryParam("limit") limit: number = 10
  ) {
    try {
      const schema = Joi.object({
        name: Joi.string(),
        page: Joi.number(),
        limit: Joi.number(),
      });
      await schema.validateAsync({
        name,
        page,
        limit,
      });
      const registerResponse = await this.userService.query({
        name,
        page,
        limit,
      });
      return Http.createResponse(registerResponse);
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  @Put("/:id")
  async update(@Body() data: object, @Param("id") id: string) {
    try {
      const registerResponse = await this.userService.updateUser(id, data);
      return Http.createResponse(registerResponse);
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  @Delete("/:id")
  async remove(@Param("id") id: string) {
    try {
      const registerResponse = await this.userService.deleteUser(id);
      return Http.createResponse(registerResponse);
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
}
