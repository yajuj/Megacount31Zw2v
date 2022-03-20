import { Router } from 'express';
import { body } from 'express-validator';

import {
  addContact,
  deleteContact,
  getContact,
  getContacts,
  updateContact,
} from '../controllers/contacts.controller';

const router = Router();

router.get('/contacts', getContacts);

router.post(
  '/contacts',
  body('name').isEmpty(),
  body('phone').isEmpty(),
  addContact
);

router.get('/contacts/:id', getContact);

router.patch(
  '/contacts/:id',
  body('name').isEmpty(),
  body('phone').isEmpty(),
  updateContact
);

router.delete('/contacts/:id', deleteContact);

export default router;
