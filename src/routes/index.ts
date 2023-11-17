import express from 'express';
import { producerRouter } from './producer';
import { defaultRoute } from './default-router';
import { response } from '../middlewares/response';

export const routes = express.Router();

routes.use(defaultRoute);
routes.use('/producer', producerRouter, response);

