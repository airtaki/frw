import { validationResult } from "express-validator";
import { ValidationError } from "../helpers/errors";
import { Request, Response, NextFunction } from "express";

export const validationHandler = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new ValidationError("Validation error!", errors);
    }
  } catch (err) {
    return next(err);
  }
  return next();
};
