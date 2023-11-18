import express from 'express';
import * as controller from '../controllers/producer';
import * as validator from '../validators/producer';
import { response } from '../middlewares/response';
import { validationHandler } from '../middlewares/validator-handler';

export const producerRouter = express.Router();

producerRouter.get('/:id', validator.getById, validationHandler, controller.getById, response);
producerRouter.post('/', validator.create, validationHandler, controller.create, response);
producerRouter.put('/:id', validator.update, validationHandler, controller.update, response);
producerRouter.delete('/:id', validator.remove, validationHandler, controller.remove, response);
