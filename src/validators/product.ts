import { body, param, query } from "express-validator";

export const getById = [
  param("id")
    .not()
    .isEmpty().bail()
    .isMongoId().bail()
    // You can add custom validations too, for example check for valid product id in MongoDB.
];

export const getByProducerId = [
  param("id")
    .not()
    .isEmpty().bail()
    .isMongoId().bail()
    // You can add custom validations too, for example check for valid producer id in MongoDB.
];

export const create = [
  body("name")
    .not()
    .isEmpty().bail()
    .isLength({ min: 3, max: 128 }).bail()
    .isAlphanumeric('en-US', { ignore: '_- ' }).bail(),

  body("vintage")
    .not()
    .isEmpty().bail()
    .isLength({ min: 2, max: 128 }).bail()
    .isAlphanumeric('en-US', { ignore: '_- ' }).bail(),

  body("producer")
    .not()
    .isEmpty().bail()
    .isMongoId().bail()
];

export const createByCsv = [
  query("url")
    .not()
    .isEmpty().bail()
    .isURL().bail()
];

export const update = [
  param("id")
    .not()
    .isEmpty().bail()
    .isMongoId().bail(),

  body("name")
    .not()
    .isEmpty().bail()
    .isLength({ min: 3, max: 128 }).bail()
    .isAlphanumeric('en-US', { ignore: '_- ' }).bail(),

  body("vintage")
    .not()
    .isEmpty().bail()
    .isLength({ min: 2, max: 128 }).bail()
    .isAlphanumeric('en-US', { ignore: '_- ' }).bail(),

  body("producer")
    .not()
    .isEmpty().bail()
    .isMongoId().bail()
];

export const remove = [
  param("id")
    .not()
    .isEmpty().bail()
    .isMongoId().bail()
];
