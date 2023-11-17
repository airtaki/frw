import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { Product, createProduct, updateProduct, deleteProduct } from '../models/product';
import { Producer } from "../models/producer";
import * as error from '../helpers/errors';

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const objectId = new mongoose.Types.ObjectId(req.params.id);
    const product = await Product.findById(objectId);
    if (!product) {
      throw new error.NotFoundError('Product Not Found.');
    }
    res.locals.data = product;
    res.status(200);
    next();
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const producer = await Producer.findById(req.body.producerId);
    if (!producer) {
      throw new error.NotFoundError('Related Producer Not Found.');
    }
    const product = await createProduct({ ...req.body, producer });
    if (!product) {
      throw new Error('Something went wrong during create product.');
    }
    res.locals.data = product;
    res.status(201);
    next();
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const producer = await Producer.findById(req.body.producerId);
    if (!producer) {
      throw new error.NotFoundError('Related Producer Not Found.');
    }
    const product = await updateProduct(req.params.id, { ...req.body, updatedAt: Date.now() });
    if (!product) {
      throw new error.NotFoundError('Product Not Found.');
    }
    res.locals.data = product;
    res.status(200);
    next();
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteProduct(req.params.id);
    res.status(204);
    next();
  } catch (error) {
    next(error);
  }
};
