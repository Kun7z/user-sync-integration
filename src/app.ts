import express from "express";
import { setupMiddlewares } from "./middlewares";
import { setupRoutes } from "./routes/index.routes";
import { notFoundHandler } from "./middlewares/fallback";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

setupMiddlewares(app);
setupRoutes(app);
app.use(notFoundHandler);
app.use(errorHandler);

export { app };
