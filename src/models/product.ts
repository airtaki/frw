import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const ProductSchema = new mongoose.Schema({
  vintage: { type: String, required: true },
  name: { type: String, required: true },
  producer: { type: ObjectId, ref: 'Producer', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Product = mongoose.model("Product", ProductSchema);

/**
 * Insert a new product or update an existing one.
 * @param product the product to insert or update.
 * @returns product.
 */
export const upsertProduct = async (product: Record<string, any>) => {
  try {
    return await Product.findOneAndUpdate({
      name: product.name,
      vintage: product.vintage,
      producer: product.producer,
    },
    {
      ...product,
      updatedAt: new Date(),
    },
    {
      new: true,
      upsert: true
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Updates an existing product.
 * @param id the product id.
 * @param values the values to update.
 * @returns product.
 */
export const updateProduct = async (id: string, values: Record<string, any>) => Product.findByIdAndUpdate(id, values, { new: true });

/**
 * Deletes a product by id.
 * @param id string Product id.
 * @returns deleted count.
 */
export const deleteProduct = async (id: string) => Product.deleteOne({ _id: id });

/**
 * Deletes multiple products by id.
 * @param ids string[] Array of product ids.
 * @returns deleted count.
 */
export const deleteProducts = async (ids: string[]) => Product.deleteMany({ _id: { $in: ids } });
