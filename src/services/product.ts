import https from 'https';
import { parse } from 'csv-parse';
import { Producer } from '../models/producer';
import { Product } from '../models/product';
import { ObjectId } from 'mongodb';

interface iProducer {
  name: string;
  country?: string;
  region?: string;
  createdAt: Date;
  updatedAt: Date;
};
interface iProduct {
  name: string;
  vintage: number;
  producer: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const parseCsvByUrl = async (url:string) => {
  try {
    return new Promise((resolve) => {
      https.request(url, async (response) => {
        response.pipe(parse({ delimiter: ',', from_line: 2 }, async (err, data: any[]) => {
          if (err) {
            throw err;
          }
          resolve(await processCsv(data));
        })).on('error', (error) => {
          throw error;
        });
      }).on('error', (error) => {
        throw error;
      }).end();
    }).then(result => {
      return result;
    });
  } catch (error) {
    throw error;
  }
};

const processCsv = async (data: any[]) => {
  for (const row of data) {
    const producerNameColumn = parseInt(process.env.CSV_PRODUCER_NAME_COLUMN || '2');
    const producerCountryColumn = parseInt(process.env.CSV_PRODUCER_COUNTRY_COLUMN || '3');
    const producerRegionColumn = parseInt(process.env.CSV_PRODUCER_REGION_COLUMN || '4');
    const productNameColumn = parseInt(process.env.CSV_PRODUCT_NAME_COLUMN || '0');
    const productVintageColumn = parseInt(process.env.CSV_PRODUCT_VINTAGE_COLUMN || '1');
    try {
      if (!row[producerNameColumn]) {
        // There is no producer name, so we can't continue with this row.
        throw new Error('Producer name is missing.');
      }
      const producer = await upsertProducer({
        name: row[producerNameColumn],
        country: row[producerCountryColumn],
        region: row[producerRegionColumn],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const product = await upsertProduct({
        name: row[productNameColumn],
        vintage: parseInt(row[productVintageColumn]),
        producer: producer._id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('ERROR', error);
    }
  }
  return 'SUCCESS';
};

const upsertProducer = async (producer: iProducer) => {
  try {
    return await Producer.findOneAndUpdate({
      name: producer.name,
      country: producer.country,
      region: producer.region,
    },
    producer,
    {
      new: true,
      upsert: true
    });
  } catch (error) {
    throw error;
  }
};

const upsertProduct = async (product: iProduct) => {
  try {
    return await Product.findOneAndUpdate({
      name: product.name,
      vintage: product.vintage,
      producer: product.producer,
    },
    product,
    {
      new: true,
      upsert: true
    });
  } catch (error) {
    throw error;
  }
};
