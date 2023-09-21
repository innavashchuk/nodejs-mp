import csv from 'csvtojson';
import { pipeline } from 'stream';
import fs from 'fs';

const CSV_FILE_PATH='./nodejs-hw1-ex1.csv';

const readerStream = fs.createReadStream(CSV_FILE_PATH);
const writerStream = fs.createWriteStream('./nodejs-hw1-ex1.txt');
const transform = csv();

pipeline(
  readerStream,
  transform,
  writerStream,
  (err) => {
    if (err) {
      console.error('Pipeline failed', err);
    } else {
      console.log('Pipeline succeeded');
    }
  }
);
