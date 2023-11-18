import express from 'express';
import * as controller from '../controllers/product';
import * as validator from '../validators/product';
import { response } from '../middlewares/response';
import { validationHandler } from '../middlewares/validator-handler';

export const productRouter = express.Router();

productRouter.get('/producer/:id', validator.getByProducerId, validationHandler, controller.getByProducerId, response);
productRouter.get('/:id', validator.getById, validationHandler, controller.getById, response);
productRouter.post('/csv', validator.createByCsv, validationHandler, controller.createByCsv, response);
productRouter.post('/', validator.create, validationHandler, controller.create, response);
productRouter.put('/:id', validator.update, validationHandler, controller.update, response);
productRouter.delete('/:id', validator.remove, validationHandler, controller.remove, response);
