import { Request, Response, NextFunction } from "express";
import { Product, createProduct, updateProduct, deleteProduct } from '../models/product';
import { Producer } from "../models/producer";
import * as error from '../helpers/errors';

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product
      .findById(req.params.id)
      .populate('producer')
      .exec();
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

export const getByProducerId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product
      .find({ producer: req.params.id })
      .populate('producer')
      .exec();
    if (!products) {
      throw new error.NotFoundError('Product(s) Not Found.');
    }
    res.locals.data = products;
    res.status(200);
    next();
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const producer = await Producer.findById(req.body.producer);
    if (!producer) {
      throw new error.NotFoundError('Related Producer Not Found.');
    }
    const product = await createProduct(req.body);
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
    const producer = await Producer.findById(req.body.producer);
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
