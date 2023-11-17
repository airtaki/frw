import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { Producer } from "./producer";

const ProductSchema = new mongoose.Schema({
  vintage: { type: String, required: true },
  name: { type: String, required: true },
  producerId: { type: ObjectId, required: true },
  producer: { type: Producer, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Product = mongoose.model("Product", ProductSchema);

export const getProductById = async (id: string) => Product.findById(id);
export const getProductsByProducerId = async (id: string) => Product.find({ producerId: id });

export const createProduct = async (values: Record<string, any>) => new Product(values)
  .save()
  .then(product => product.toObject());
export const updateProduct = async (id: string, values: Record<string, any>) => Product.findByIdAndUpdate(id, values, { new: true });
export const deleteProduct = async (id: string) => Product.findByIdAndDelete(id);