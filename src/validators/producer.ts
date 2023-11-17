import { body, param } from "express-validator";

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
    .isLength({ min: 3, max: 128 }).bail()
    .isAlphanumeric('en-US', { ignore: '_- ' }).bail(),

  body("country")
    .not()
    .isEmpty().bail()
    .isLength({ min: 2, max: 128 }).bail()
    .isAlphanumeric('en-US', { ignore: '_- ' }).bail()
    .optional(),

  body("region")
    .not()
    .isEmpty().bail()
    .isLength({ min: 2, max: 128 }).bail()
    .isAlphanumeric('en-US', { ignore: '_- ' }).bail()
    .optional(),
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

  body("country")
    .not()
    .isEmpty().bail()
    .isLength({ min: 2, max: 128 }).bail()
    .isAlphanumeric('en-US', { ignore: '_- ' }).bail()
    .optional(),

  body("region")
    .not()
    .isEmpty().bail()
    .isLength({ min: 2, max: 128 }).bail()
    .isAlphanumeric('en-US', { ignore: '_- ' }).bail()
    .optional(),
];

export const remove = [
  param("id")
    .not()
    .isEmpty().bail()
    .isMongoId().bail()
];
