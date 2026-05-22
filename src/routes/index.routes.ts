import { Express } from "express";
import { usersRoutes } from "./users.routes";
import { AppError } from "../error/appError";

export const setupRoutes = (app: Express) => {
  app.get("/", (req, res) => {
    try {
      res.send({ status: "success", message: "Server running" });
    } catch (err) {
      console.log(err);
      throw new AppError("Erro na aplicação", 500);
    }
  });

  app.use("/users", usersRoutes);
};
