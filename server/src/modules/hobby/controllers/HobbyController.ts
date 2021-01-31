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
import { IHobbyService } from "../../../lib/interfaces";
import { IHobbyDTO } from "../../../lib/dto";

import HobbyService from "../services/HobbyService";

import Http from "../../../common/response";

@JsonController()
export class HobbyController {
  private hobby_service: IHobbyService;

  constructor() {
    this.hobby_service = Container.get(HobbyService);
  }

  @Post("")
  async create(@Body() hobby: IHobbyDTO) {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        year: Joi.string().required(),
        passionLevel: Joi.string().required(),
        user: Joi.string().required(),
      });
      await schema.validateAsync(hobby);

      const response = await this.hobby_service.create(hobby);
      return Http.createResponse(response, 201);
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
    @QueryParam("year") year: string,
    @QueryParam("passionLevel") passion_level: string,
    @QueryParam("user") user: string,
    @QueryParam("page") page: number = 1,
    @QueryParam("limit") limit: number = 10
  ) {
    try {
      const schema = Joi.object({
        name: Joi.string(),
        year: Joi.string(),
        passion_level: Joi.string(),
        user: Joi.string(),
        page: Joi.number(),
        limit: Joi.number(),
      });
      await schema.validateAsync({
        name,
        year,
        passion_level,
        user,
        page,
        limit,
      });
      const response = await this.hobby_service.query({
        name,
        year,
        passion_level,
        user,
        page,
        limit,
      });
      return Http.createResponse(response);
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }

  @Put("/:id")
  async update(@Body() hobby: IHobbyDTO, @Param("id") id: string) {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        year: Joi.string().required(),
        passionLevel: Joi.string().required(),
      });
      await schema.validateAsync(hobby);
      const response = await this.hobby_service.updateHobby(id, hobby);
      return Http.createResponse(response);
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
      const schema = Joi.object({
        id: Joi.string().required(),
      });
      await schema.validateAsync({ id });
      const response = await this.hobby_service.deleteHobby(id);
      return Http.createResponse(response);
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
}
