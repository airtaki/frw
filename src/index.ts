import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

dotenv.config();

if (!process.env.APP_PORT) {
  console.error("APP_PORT is not set.");
  process.exit(1);
}

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

import { routes } from './routes';
import { errorHandler } from "./middlewares/error-handler";
import { notFoundHandler } from "./middlewares/not-found-handler";
app.use('/', routes);
app.use(errorHandler);
app.use(notFoundHandler);

const APP_PORT: number = parseInt(process.env.APP_PORT as string);
const APP_NAME: string = process.env.APP_NAME as string;
app.listen(APP_PORT, () => {
  console.log(`${APP_NAME} is listening on port ${APP_PORT}.`);
});

mongoose.connect(process.env.MONGODB_URI as string);
mongoose.connection.on("error", (error: Error) => {
  console.error(error);
  process.exit(1);
});

