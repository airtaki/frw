interface iError extends Error {
  statusCode?: number;
};

import { NextFunction, Request, Response } from "express";
import util from "util";

export const errorHandler = (err: iError, req: Request, res: Response, next: NextFunction) => {
  console.error(util.inspect(err, true, 8, true));
  let statusCode:number;
  if (err.hasOwnProperty("statusCode")) {
    statusCode = err.statusCode as number;
    delete err.statusCode;
  }
  res
    .status(statusCode || 500)
    .setHeader("Content-Type", "application/json")
    .send({ errors: err });
};
