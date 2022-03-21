import cors from 'cors';
import express from 'express';
import Datastore from 'nedb';
import router from './routes';

const app = express();
const PORT = 5000;

export const db = new Datastore({
  filename: 'data.db',
  autoload: true,
  timestampData: true,
});

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}/`));
