import { Request, Response, NextFunction } from "express";
import { Producer, upsertProducer, updateProducer, deleteProducer } from '../models/producer';
import * as error from '../helpers/errors';

/**
 * Gets a single producer by its id.
 * 
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns Producer.
 */
export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const producer = await Producer.findById(req.params.id);
    if (!producer) {
      // If the producer is not found, we throw a 404 error.
      throw new error.NotFoundError('Producer Not Found.');
    }
    res.locals.data = producer;
    // Status: OK.
    res.status(200);
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Creates a new producer or updates an existing one.
 * 
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns procuder.
 */
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // We use upsertProducer to create a new producer or update an existing one.
    res.locals.data = await upsertProducer(req.body);
    // Status: Created.
    res.status(201);
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Updates an existing producer.
 * 
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns producer.
 */
export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.locals.data = await updateProducer(req.params.id, req.body);
    // Status: OK.
    res.status(200);
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes an existing producer.
 * 
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns 200 OK.
 */
export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.locals.data = await deleteProducer(req.params.id);
    // Status: OK.
    res.status(200);
    next();
  } catch (error) {
    next(error);
  }
};
