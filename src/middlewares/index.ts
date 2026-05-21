import { Express } from "express";

import { loggerMiddleware } from "./logger.middleware";

export const setupMiddlewares = (app: Express) => {
  app.use(loggerMiddleware);
};
