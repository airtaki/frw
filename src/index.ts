import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

if (!process.env.APP_PORT) {
  console.error("APP_PORT is not set.");
  process.exit(1);
}

const app = express();

app.use(express.json());

import { routes } from './routes';
import { errorHandler } from "./middlewares/error-handler";
app.use('/', routes);
app.use(errorHandler);

const APP_PORT: number = parseInt(process.env.APP_PORT as string, 10);
const APP_NAME: string = process.env.APP_NAME as string;
app.listen(APP_PORT, () => {
  console.log(`${APP_NAME} is listening on port ${APP_PORT}.`);
});

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI as string);
mongoose.connection.on("error", (error: Error) => {
  console.error(error);
  process.exit(1);
});

