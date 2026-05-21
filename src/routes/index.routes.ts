import { Express } from "express";

import { usersRoutes } from "./users.routes";

export const setupRoutes = (app: Express) => {
  app.use("/users", usersRoutes);
};
