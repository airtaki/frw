import { body, param, query, oneOf } from "express-validator";
import { Producer } from "../models/producer";
import { Product } from "../models/product";

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
  oneOf([
    [
      // Got a single product.
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
        .custom(async (value) => {
          const producer = await Producer.findById(value);
          if (!producer) {
            return Promise.reject('Related Producer Not Found.');
          }
          return true;
        })
    ],
    [
      // Got an array, which contains products.
      body("*.name")
        .not()
        .isEmpty().bail()
        .isLength({ min: 3, max: 128 }).bail()
        .isAlphanumeric('en-US', { ignore: '_- ' }).bail(),

      body("*.vintage")
        .not()
        .isEmpty().bail()
        .isLength({ min: 2, max: 128 }).bail()
        .isAlphanumeric('en-US', { ignore: '_- ' }).bail(),

      body("*.producer")
        .not()
        .isEmpty().bail()
        .isMongoId().bail()
        .custom(async (value) => {
          const producer = await Producer.findById(value);
          if (!producer) {
            return Promise.reject('Related Producer Not Found.');
          }
          return true;
        })

    ]
  ], {
    errorType: 'least_errored'
  })
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
    .isMongoId().bail()
    .custom(async (value) => {
      const product = await Product.findById(value);
      if (!product) {
        return Promise.reject('Related Producer Not Found.');
      }
      return true;
    }),

  body("name")
    .not()
    .isEmpty().bail()
    .isLength({ min: 3, max: 128 }).bail()
    .isAlphanumeric('en-US', { ignore: '_- ' }).bail()
    .optional(),

  body("vintage")
    .not()
    .isEmpty().bail()
    .isLength({ min: 2, max: 128 }).bail()
    .isAlphanumeric('en-US', { ignore: '_- ' }).bail()
    .optional(),

  body("producer")
    .not()
    .isEmpty().bail()
    .isMongoId().bail()
    .custom(async (value) => {
      const producer = await Producer.findById(value);
      if (!producer) {
        return Promise.reject('Related Producer Not Found.');
      }
      return true;
    })
    .optional()

];

export const remove = [
  oneOf([
    [
      body("ids")
        .not()
        .isEmpty().bail()
        .isArray().bail(),

      body("ids.*")
        .not()
        .isEmpty().bail()
        .isMongoId().bail()
    ],
    [
      param("id")
        .not()
        .isEmpty().bail()
        .isMongoId().bail()
    ]
  ], {
    errorType: 'least_errored'
  })
];
