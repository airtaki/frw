import express from 'express';
import * as controller from '../controllers/producer';
import * as validator from '../validators/producer';
import { response } from '../middlewares/response';
import { validationHandler } from '../middlewares/validator-handler';

export const producerRouter = express.Router();
// Gets a single producer by ID.
producerRouter.get('/:id', validator.getById, validationHandler, controller.getById, response);
// Creates a new producer.
producerRouter.post('/', validator.create, validationHandler, controller.create, response);
// Updates an existing producer.
producerRouter.put('/:id', validator.update, validationHandler, controller.update, response);
// Deletes an existing producer.
producerRouter.delete('/:id', validator.remove, validationHandler, controller.remove, response);
