import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Producer, createProducer, updateProducer, deleteProducer } from '../models/producer';
import * as error from '../helpers/errors';

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const objectId = new mongoose.Types.ObjectId(req.params.id);
    const producer = await Producer.findById(objectId);
    if (!producer) {
      throw new error.NotFoundError('Producer Not Found.');
    }
    res.locals.data = producer;
    res.status(200);
    next();
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const producer = await createProducer(req.body);
    if (!producer) {
      throw new Error('Something went wrong during create producer.');
    }
    res.locals.data = producer;
    res.status(201);
    next();
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const producer = await updateProducer(req.params.id, { ...req.body, updatedAt: Date.now() });
    if (!producer) {
      throw new error.NotFoundError('Producer Not Found.');
    }
    res.locals.data = producer;
    res.status(200);
    next();
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteProducer(req.params.id);
    res.status(204);
    next();
  } catch (error) {
    next(error);
  }
};
