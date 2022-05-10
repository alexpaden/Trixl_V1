import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data/data-source';
//import { Container } from 'typedi';
//import { ImapUserController } from './controllers/imapuser.controller';

const main = async () => {

  //const imap2Controller = require('./../controllers/Imap2Controller');
  //const imap2Controller = Container.get<Imap2Controller>(Imap2Controller);

  //const app = createExpressServer({
   // controllers: [ Imap2Controller ], // we specify controllers we want to use
  //});
  const app = express();
  
  await AppDataSource.initialize().catch((error) => console.log(error));

  //set up routes & controller service "controller-routes"
  //const imapUserController = Container.get<ImapUserController>(ImapUserController);

  const imaproute = require('./routes/imap');
  var bodyParser = require("body-parser");
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/imap', imaproute);


  //app.get('/imap', imapUserController);

  app.listen(3000, () => {
    console.log('Server started');
  });

}

main().catch(err => {
  console.error(err);
});
