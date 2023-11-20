import express from 'express';
import * as controller from '../controllers/product';
import * as validator from '../validators/product';
import { response } from '../middlewares/response';
import { validationHandler } from '../middlewares/validator-handler';

export const productRouter = express.Router();

// Gets products by producer ID.
productRouter.get('/producer/:id', validator.getByProducerId, validationHandler, controller.getByProducerId, response);
// Gets a single product by ID.
productRouter.get('/:id', validator.getById, validationHandler, controller.getById, response);
// Creates new products and producers by the provided CSV url.
productRouter.post('/csv', validator.createByCsv, validationHandler, controller.createByCsv, response);
// Creates a new product or products.
productRouter.post('/', validator.create, validationHandler, controller.create, response);
// Updates an existing product.
productRouter.put('/:id', validator.update, validationHandler, controller.update, response);
// Deletes an existing product.
productRouter.delete('/:id', validator.remove, validationHandler, controller.remove, response);
// Deletes multiple existing products.
productRouter.delete('/', validator.remove, validationHandler, controller.remove, response);
