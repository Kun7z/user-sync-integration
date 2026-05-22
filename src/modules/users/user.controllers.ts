import { Request, Response } from "express";
import { syncUsersService } from "./sync-users.service";
import { userRepository } from "./user.repository";
import { AppError } from "../../error/appError";

export const syncUsersController = async (req: Request, res: Response) => {
  try {
    const result = await syncUsersService();

    return res.json(result);
  } catch (error) {
    console.log(error);
    throw new AppError("Erro ao sincronizar os usuários.", 404);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.findAll();
    return res.json(users);
  } catch (error) {
    console.log(error);
    throw new AppError("Erro ao adquirir os usuários!", 404);
  }
};
