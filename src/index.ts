import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data/data-source';

const imaproute = require('./routes/imap');
const bodyParser = require("body-parser");

const main = async () => {

  await AppDataSource.initialize().catch((error) => console.log(error));

  const app = express();
  app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
  app.use('/imap', imaproute);

  app.listen(3000, () => {
    console.log('Server started');
  });
}

main().catch(err => {
  console.error(err);
});
