import { Request, Response } from "express";
import { syncUsersService } from "./sync-users.service";
import { userRepository } from "./user.repository";

export const syncUsersController = async (req: Request, res: Response) => {
  const result = await syncUsersService();

  return res.json(result);
};

export const getUsers = async (req: Request, res: Response) => {
  const users = await userRepository.findAll();

  return res.json(users);
};
