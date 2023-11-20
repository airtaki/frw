import express from 'express';
import { producerRouter } from './producer';
import { productRouter } from './product';

export const routes = express.Router();

routes.use('/producer', producerRouter);
routes.use('/product', productRouter);

