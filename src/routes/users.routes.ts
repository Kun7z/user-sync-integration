import { Router } from "express";

import {
  getUsers,
  syncUsersController,
} from "../modules/users/user.controllers";

const usersRoutes = Router();

usersRoutes.get("/", getUsers);

usersRoutes.post("/sync", syncUsersController);

export { usersRoutes };
