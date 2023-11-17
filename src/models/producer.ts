import mongoose from "mongoose";

const ProducerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  region: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Producer = mongoose.model("Producer", ProducerSchema);

export const getProducerById = async (id: string) => Producer.findById(id);
export const getProducerByName = async (name: string) => Producer.find({ name: name });
export const getProducerByCountry = async (country: string) => Producer.find({ country: country });

export const createProducer = async (values: Record<string, any>) => new Producer(values)
  .save()
  .then(producer => producer.toObject());
export const updateProducer = async (id: string, values: Record<string, any>) => Producer.findByIdAndUpdate(id, values, { new: true });
export const deleteProducer = async (id: string) => Producer.findByIdAndDelete(id);
