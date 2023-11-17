import express from 'express';
import * as controller from '../controllers/product';
import * as validator from '../validators/product';
import { response } from '../middlewares/response';
import { validationHandler } from '../middlewares/validator-handler';

export const productRouter = express.Router();

/**
 * @swagger
 * /product:
 *   get:
 *     description: Get all products
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Validation Error
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 * 
 */
productRouter.get('/:id', validator.getById, validationHandler, controller.getById, response);

/**
 * @swagger
 * /product:
 *   post:
 *     description: Create a new product
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Internal Server Error
 * 
 */
productRouter.post('/', validator.create, validationHandler, controller.create, response);

/**
 * @swagger
 * /product:
 *   put:
 *     description: Update a product
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 * 
 */
productRouter.put('/:id', validator.update, validationHandler, controller.update, response);

/**
 * @swagger
 * /product:
 *   delete:
 *     description: Delete a product
 *     responses:
 *       204:
 *         description: No Content
 *       500:
 *         description: Internal Server Error
 * 
 */
productRouter.delete('/:id', validator.remove, validationHandler, controller.remove, response);
