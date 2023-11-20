import { argv } from "process";
import { parseCsvByUrl } from '../services/process';
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URI as string);
mongoose.connection.on("error", (error: Error) => {
  console.error(error);
  process.exit(1);
});

(async () => {
  try {
    const url: string = argv[2];
    console.log('Starting to process the given CSV:', url);
    const result = await parseCsvByUrl(url as string);
    console.log('RESULT', result);
    process.exit(0);
  } catch (error) {
    console.error('ERROR', error);
    process.exit(1);
  }
})();


