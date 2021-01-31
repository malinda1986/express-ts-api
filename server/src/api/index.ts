import { Router } from "express";
import user from "../modules/user/routes";
import hobby from "../modules/hobby/routes";
export default () => {
  const app = Router();
  user(app);
  hobby(app);

  return app;
};
