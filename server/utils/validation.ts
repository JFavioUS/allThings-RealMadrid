import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

function validate(req: Request, res: Response, next: NextFunction) {
  const error = validationResult(req);
  const hasError = !error.isEmpty();

  if (hasError) {
    return res.status(400).json({ errors: error.array() });
  } else {
    next();
  }
}

export default validate;
