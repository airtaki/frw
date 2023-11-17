import { body, param, query, oneOf } from "express-validator";

export const getById = [
  param("id")
    .not()
    .isEmpty().bail()
    .isMongoId().bail()
];

export const create = [
  body("name")
    .not()
    .isEmpty().bail()
    .isLength({ min: 3, max: 50 }).bail()
    .isAlphanumeric('en-US', { ignore: '_- ' }).bail(),

  body("country")
    .not()
    .isEmpty().bail()
    .isLength({ min: 2, max: 50 }).bail()
    .isAlphanumeric('en-US', { ignore: '_- ' }).bail(),

  body("region")
    .not()
    .isEmpty().bail()
    .isLength({ min: 2, max: 50 }).bail()
    .isAlphanumeric('en-US', { ignore: '_- ' }).bail(),
];

export const update = [
  param("id")
    .not()
    .isEmpty().bail()
    .isMongoId().bail(),

  body("name")
    .not()
    .isEmpty().bail()
    .isLength({ min: 3, max: 50 }).bail()
    .isAlphanumeric('en-US', { ignore: '_- ' }).bail(),

  body("country")
    .not()
    .isEmpty().bail()
    .isLength({ min: 2, max: 50 }).bail()
    .isAlphanumeric('en-US', { ignore: '_- ' }).bail(),

  body("region")
    .not()
    .isEmpty().bail()
    .isLength({ min: 2, max: 50 }).bail()
    .isAlphanumeric('en-US', { ignore: '_- ' }).bail(),
];

export const remove = [
  param("id")
    .not()
    .isEmpty().bail()
    .isMongoId().bail()
];
