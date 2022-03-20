import { Request, Response } from 'express';
import { db } from '..';

export const getContacts = async (req: Request, res: Response) => {
  db.find({}, (err: Error | null, doc: any) => {
    return res.json(doc);
  });
};

export const updateContact = async (req: Request, res: Response) => {
  const _id = req.params.id;
  const data = req.body;
  db.update({ _id }, data, { upsert: true }, (err, doc) => {
    return res.json(doc);
  });
};

export const getContact = async (req: Request, res: Response) => {
  const _id = req.params.id;
  db.find({ _id }, (err: Error | null, doc: any) => {
    return res.json(doc);
  });
};

export const addContact = async (req: Request, res: Response) => {
  const data = req.body;
  db.insert(data, (err, doc) => {
    return res.json(doc);
  });
};

export const deleteContact = async (req: Request, res: Response) => {
  const _id = req.params.id;
  db.remove({ _id }, {}, function (err, numRemoved) {
    return res.sendStatus(200);
  });
};
