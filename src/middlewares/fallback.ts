import { Request, Response } from "express";

export function notFoundHandler(req: Request, res: Response) {
  return res.status(404).json({
    status: "error",
    message: "Route not found",
    path: req.originalUrl,
  });
}
