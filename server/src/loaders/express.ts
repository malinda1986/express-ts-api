import "reflect-metadata";
import cors from "cors";
import express from "express";
import * as swaggerDocument from "../../docs/swagger.json";
import swaggerUi from "swagger-ui-express";
import routes from "../api";
import config from "../config";
export default ({ app }: { app: express.Application }) => {
  app.get(`/${config.api_version}/health`, (req, res) => {
    res.status(200).json({ success: true, message: "Ok" });
  });

  app.use(
    `/${config.api_version}/api-doc`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );
  app.use(cors());
  app.use(require("method-override")());
  //app.use(express.json({limit: '50mb'}));
  //app.use(express.urlencoded({limit: '50mb'}));
  app.use(`/${config.api_version}`, routes());
};
