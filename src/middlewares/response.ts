import util from "util";
import { Request, Response, NextFunction } from "express";

export const response = (req: Request, res: Response, next: NextFunction) => {
  const resObj = {
    message: res.statusMessage,
    data: res.locals.data,
  };
  if (process.env.APP_ENV as string === "development" && process.env.APP_DEBUG as string === "true") {
    console.log(util.inspect({...resObj, body: req.body}, true, 8, true));
  }
  res
    .status(res.statusCode)
    .setHeader("Content-Type", "application/json")
    .json(resObj);
};
