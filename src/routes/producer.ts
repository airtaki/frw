import express from 'express';
import * as controller from '../controllers/producer';
import * as validator from '../validators/producer';
import { response } from '../middlewares/response';
import { validationHandler } from '../middlewares/validator-handler';

export const producerRouter = express.Router();

/**
 * @swagger
 * /producer:
 *   get:
 *     description: Get all producers
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
producerRouter.get('/:id', validator.getById, validationHandler, controller.getById, response);

/**
 * @swagger
 * /producer:
 *   post:
 *     description: Create a new producer
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Internal Server Error
 * 
 */
producerRouter.post('/', validator.create, validationHandler, controller.create, response);

/**
 * @swagger
 * /producer:
 *   put:
 *     description: Update a producer
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 * 
 */
producerRouter.put('/:id', validator.update, validationHandler, controller.update, response);

/**
 * @swagger
 * /producer:
 *   delete:
 *     description: Delete a producer
 *     responses:
 *       204:
 *         description: No Content
 *       500:
 *         description: Internal Server Error
 * 
 */
producerRouter.delete('/:id', validator.remove, validationHandler, controller.remove, response);
