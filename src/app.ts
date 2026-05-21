import express from "express";
import { setupMiddlewares } from "./middlewares";
import { setupRoutes } from "./routes/index.routes";
import { notFoundHandler } from "./middlewares/fallback";

const app = express();

app.use(express.json());

setupMiddlewares(app);
setupRoutes(app);
app.use(notFoundHandler);

export { app };
