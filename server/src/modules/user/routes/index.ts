import { Router } from "express";
import { useExpressServer } from "routing-controllers";
import { UserController } from "../controllers";

export default (app: Router) => {
  useExpressServer(app, {
    routePrefix: "/users",
    controllers: [UserController],
  });
};
