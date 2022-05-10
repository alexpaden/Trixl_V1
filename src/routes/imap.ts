const router = require('express').Router();
import { ImapUserController}  from '../controllers/imapuser.controller';

const imapUserController = new ImapUserController();

// Get all current users
router.get('/user', imapUserController.getAll);

// Register a new ImapUser
router.post('/user', imapUserController.register);

// Get user(s) by tagname
router.get('/user/:tagname', imapUserController.getByTag);

//Seed some random shit
router.post('/user/seed', imapUserController.seedShit);


module.exports = router;