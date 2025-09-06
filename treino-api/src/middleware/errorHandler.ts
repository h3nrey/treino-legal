// src/middlewares/errorHandler.ts

import { Request, Response, NextFunction } from "express";
import { ZodError, treeifyError } from "zod";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error); 

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: treeifyError(error),
    });
  }

  return res.status(500).json({
    message: "An internal server error occurred.",
  });
};