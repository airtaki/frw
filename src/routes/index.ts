import express from 'express';
import { defaultRoute } from './default-router';
import { producerRouter } from './producer';
import { productRouter } from './product';

export const routes = express.Router();

routes.use(defaultRoute);
routes.use('/producer', producerRouter);
routes.use('/product', productRouter);

