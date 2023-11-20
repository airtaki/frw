import mongoose from "mongoose";

export const ProducerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: false },
  region: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Producer = mongoose.model("Producer", ProducerSchema);

/**
 * Insert a new producer or update an existing one.
 * @param producer the producer to insert or update.
 * @returns producer.
 */
export const upsertProducer = async (producer: Record<string, any>) => {
  try {
    return await Producer.findOneAndUpdate({
      name: producer.name,
      country: producer.country,
      region: producer.region,
    },
    {
      ...producer,
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
 * Updates an existing producer.
 * @param id the producer id.
 * @param values the values to update.
 * @returns producer.
 */
export const updateProducer = async (id: string, values: Record<string, any>) => Producer.findByIdAndUpdate(id, values, { new: true });

/**
 * 
 * @param id the producer id to delete.
 * @returns deleted count.
 */
export const deleteProducer = async (id: string) => Producer.deleteOne({ _id: id });
