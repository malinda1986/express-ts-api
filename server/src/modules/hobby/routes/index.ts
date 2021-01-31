import { Router } from "express";
import { useExpressServer } from "routing-controllers";
import { HobbyController } from "../controllers";

export default (app: Router) => {
  useExpressServer(app, {
    routePrefix: "/hobbies",
    controllers: [HobbyController],
  });
};
