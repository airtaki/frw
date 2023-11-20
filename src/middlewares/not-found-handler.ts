import { NextFunction, Request, Response } from "express";
import util from "util";

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  const resObj = {
    message: "This endpoint does not exists.",
    data: {
      timestamp: new Date(),
      method: req.method,
      protocol: req.protocol,
      hostname: req.hostname,
      url: req.url,
      params: req.params,
      query: req.query,
      body: req.body
    }
  };
  if (process.env.APP_ENV === "development") {
    console.warn(util.inspect(resObj, true, 8, true));
  }
  res
    .status(404)
    .setHeader("Content-Type", "application/json")
    .json({
      message: resObj.message
    });
};
