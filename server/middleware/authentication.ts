import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function handleTest(res: Response, next: NextFunction) {
  res.locals.user = 1;

  return next();
}

function verifyToken(req: Request, res: Response, next: NextFunction) {
  if (process.env.NODE_ENV === "test") return handleTest(res, next);

  const { authorization } = req.headers;
  const splitToken = authorization?.split(" ")[1];

  if (splitToken) {
    try {
      const tokenVerified = jwt.verify(splitToken, "MySecret");

      if (tokenVerified) {
        res.locals.user = tokenVerified.sub;

        return next();
      }
    } catch {
      return res.sendStatus(401);
    }
  }

  return res.sendStatus(401);
}

export { verifyToken };
