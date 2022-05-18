const router = require('express').Router();
import { ImapAccountController}  from '../controllers/imap/account.controller';
import { ImapMailController } from '../controllers/imap/mail.controller';

const imapAccountController = new ImapAccountController();
const imapMailController = new ImapMailController();

// Get all current users
router.get('/users', imapAccountController.getAll);

// get or create imap user
router.post('/user', imapAccountController.register);
router.get('/user', imapAccountController.getByEmail);

// Get user(s) by tag
router.get('/user/:tag', imapAccountController.getByTag);

// Seed some random shit
router.post('/user/seed', imapAccountController.seedShit);

// -
// Retrieve emails for imap
router.get('/mail', imapMailController.currentTesterShit);


// Retrieve all email(s) by imap id
// router.get('/mail', imapMailController.getAll);

// Retrieve email by email id
//router.get('/mail/:id', imapMailController.getEmail);

// Retrieve email(s) by imap folder id
// router.get('/mail/folder/:id', imapMailController.getByFolder);


module.exports = router;