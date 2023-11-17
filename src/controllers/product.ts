import { Request, Response, NextFunction } from "express";
import { Product, createProduct, updateProduct, deleteProduct } from '../models/product';

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findById(req.params.id);
    res.locals.data = product;
    res.status(200);
    next();
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await createProduct(req.body);
    res.locals.data = product;
    res.status(201);
    next();
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await updateProduct(req.params.id, req.body);
    res.locals.data = product;
    res.status(200);
    next();
  } catch (error) {
    next(error);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await deleteProduct(req.params.id);
    res.status(204);
    next();
  } catch (error) {
    next(error);
  }
};
