import { db } from '..';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const getContacts = (request: Request, response: Response) => {
  db.find({})
    .sort({ createdAt: -1 })
    .exec(function (err: Error | null, docs: any[]) {
      if (err) {
        return response.status(400).json({ msg: 'Произошла ошибка.' });
      }
      response.json(docs);
    });
};

export const addContact = (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    const mapedErrors = errors.mapped();
    if (mapedErrors.name && mapedErrors.phone) {
      return response
        .status(400)
        .json({ msg: 'Введите валидные номер телефона и имя' });
    }
    if (mapedErrors.name) {
      return response
        .status(400)
        .json({ msg: 'Имя должно содержать 3-20 символов' });
    }
    if (mapedErrors.phone) {
      return response.status(400).json({
        msg: `Неверный номер ${mapedErrors.phone.value}, введите номер в международном формате +7 9XX XXX XX XX.`,
      });
    }
  }

  const data = request.body;

  db.insert(data, (err, doc) => {
    if (err) {
      return response
        .status(400)
        .json({ msg: 'Контакт с таким номером уже есть.' });
    }
    return response.json(doc);
  });
};

export const getContact = (request: Request, response: Response) => {
  const id = request.params.id;
  db.findOne({ _id: id }, function (err, doc) {
    response.json(doc);
  });
};

export const updateContact = (request: Request, response: Response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    const mapedErrors = errors.mapped();
    if (mapedErrors.name && mapedErrors.phone) {
      return response
        .status(400)
        .json({ msg: 'Введите валидные номер телефона и имя' });
    }
    if (mapedErrors.name) {
      return response
        .status(400)
        .json({ msg: 'Имя должно содержать 3-20 символов' });
    }
    if (mapedErrors.phone) {
      return response.status(400).json({
        msg: `Неверный номер ${mapedErrors.phone.value}, введите номер в международном формате +7 9XX XXX XX XX.`,
      });
    }
  }
  const id = request.params.id;
  const data = request.body;
  db.update({ _id: id }, data, { upsert: true }, function (err, numReplaced) {
    if (err) {
      return response.status(400).json({ msg: 'Не удалось добавить контакт.' });
    }
    response.sendStatus(200);
  });
};

export const deleteContact = (request: Request, response: Response) => {
  const id = request.params.id;
  db.remove({ _id: id }, {}, function (err, numRemoved) {
    if (err) {
      return response.status(400).json({ msg: 'Не удалось удалить контакт.' });
    }
    response.sendStatus(200);
  });
};
