import { Request, Response, NextFunction } from "express";
import { Product, upsertProduct, updateProduct, deleteProduct, deleteProducts } from '../models/product';
import * as error from '../helpers/errors';
import { fork } from 'child_process';
import path from 'path';

/**
 * Gets a single product by its id.
 * 
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns Product.
 */
export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product
      .findById(req.params.id)
      .populate('producer')
      .exec();
    if (!product) {
      // If the product is not found, we throw a 404 error.
      throw new error.NotFoundError('Product Not Found.');
    }
    res.locals.data = product;
    // Status: OK.
    res.status(200);
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Gets all products by producer id.
 * 
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns Array of products.
 */
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

/**
 * Creates a new product or updates an existing one.
 * 
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns Array of created or updated product(s).
 */
export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // This is the result object, we'll return this to the client.
    const result: any[] = [];
    if (req.body instanceof Array === true) {
      // If the request body is an array, we iterate through it.
      for (const product of req.body) {
        result.push(await upsertProduct(product));
      }
    } else {
      // If the request body is a single object, we just upsert it.
      result.push(await upsertProduct(req.body));
    }
    res.locals.data = result;
    // Status: created.
    res.status(201);
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Bulk insert or update products from a CSV file.
 * This could be a long running process, so we'll fork it to a separate background process.
 * 
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns started: true.
 */
export const createByCsv = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const url = req.query.url as string;
    // We'll fork the process to a separate background process.
    fork(path.resolve(__dirname + '/../process/csv'), [url], {
      detached: true,
      stdio: 'inherit',
      env: process.env
    }).unref();
    res.locals.data = { started: true };
    // Status: accepted.
    res.status(202);
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Updates an existing product.
 * 
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns Array of created or updated product(s).
 */
export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.locals.data = await updateProduct(req.params.id, req.body);
    // Status: OK.
    res.status(200);
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes an existing product or products.
 * 
 * @param req Request
 * @param res Response
 * @param next NextFunction
 * @returns 200 OK.
 */
export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let result: any;
    if (req.body.ids) {
      // If we got multiple ids in the request body, we use the bulk delete function.
      result = await deleteProducts(req.body.ids);
    } else {
      // If there is a single id param, we use the single delete function.
      result = await deleteProduct(req.params.id);
    }
    res.locals.data = result;
    // Status: OK.
    res.status(200);
    next();
  } catch (error) {
    next(error);
  }
};
