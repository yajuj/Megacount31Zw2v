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
  body('name').isLength({
    min: 3,
    max: 20,
  }),
  body('phone').isMobilePhone('ru-RU'),
  addContact
);

router.get('/contacts/:id', getContact);

router.patch(
  '/contacts/:id',
  body('name').isLength({
    min: 3,
    max: 20,
  }),
  body('phone').isMobilePhone('ru-RU'),
  updateContact
);

router.delete('/contacts/:id', deleteContact);

export default router;
