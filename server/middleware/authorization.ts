import { Request, Response, NextFunction } from "express";

async function authorise(req: Request, res: Response, next: NextFunction) {
  if (req.path == "/users" && req.method == "GET") {
    const isAdmin = res.locals.role_id == 1;

    if (!isAdmin) {
      return res.status(403).json({
        error: "Not Authorized",
      });
    }
    return next();
  }
  return next();
}

export { authorise };
