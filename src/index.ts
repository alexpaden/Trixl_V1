import 'reflect-metadata';
import express from 'express';
import { ImapController } from './controllers/ImapController';
import { AppDataSource } from './data/data-source';
import { Container } from 'typedi';

const main = async () => {
  const app = express();
  
  await AppDataSource.initialize().catch((error) => console.log(error));

  //set up routes & controller service "controller-routes"
  const imapUserController = Container.get<ImapController>(ImapController);
  app.get('/imap', (req, res) => imapUserController.getAllUsers(req, res));

  app.listen(3000, () => {
    console.log('Server started');
  });
}

main().catch(err => {
  console.error(err);
});
