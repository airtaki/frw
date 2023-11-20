import https from 'https';
import { parse } from 'csv-parse';
import { upsertProducer } from '../models/producer';
import { upsertProduct } from '../models/product';

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
    if (process.env.APP_ENV === 'development') {
      // In dev mode, we want to show the process on console.
      console.log('ROW', row);
    }
    // Determine the column numbers from the environment variables.
    const producerNameColumn = parseInt(process.env.CSV_PRODUCER_NAME_COLUMN || '2');
    const producerCountryColumn = parseInt(process.env.CSV_PRODUCER_COUNTRY_COLUMN || '3');
    const producerRegionColumn = parseInt(process.env.CSV_PRODUCER_REGION_COLUMN || '4');
    const productNameColumn = parseInt(process.env.CSV_PRODUCT_NAME_COLUMN || '0');
    const productVintageColumn = parseInt(process.env.CSV_PRODUCT_VINTAGE_COLUMN || '1');
    // This try-catch block is intentionally inside the loop,
    // because we don't want to break the whole process
    // if one row is invalid.
    try {
      if (!row[producerNameColumn]) {
        // There is no producer name, so we can't continue with this row.
        throw new Error('Producer name is missing!');
      }
      if (!row[productNameColumn]) {
        // There is no product name, so we can't continue with this row.
        throw new Error('Product name is missing!');
      }
      if (!row[productVintageColumn]) {
        // There is no product vintage, so we can't continue with this row.
        throw new Error('Product vintage is missing!');
      }
      // Upsert the producer.
      const producer = await upsertProducer({
        name: row[producerNameColumn],
        country: row[producerCountryColumn],
        region: row[producerRegionColumn],
      });
      // Upsert the product, using the upserted producer's ID.
      await upsertProduct({
        name: row[productNameColumn],
        vintage: parseInt(row[productVintageColumn]),
        producer: producer._id,
      });
    } catch (error) {
      // If an error occurs, log it, and continue with the next row.
      console.error('ERROR', error);
      console.error('ROW', row);
    }
  }
  return 'SUCCESS';
};
