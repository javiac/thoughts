import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

import { ThoughsStore } from './ThoughtsStore';
import { validateThought } from './utils/validateThought';

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

const thoughtsStore = new ThoughsStore();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/thoughts', (req, res) => {
  res.json({ data: thoughtsStore.getThoughts() });
});

app.get('/thoughts/:id', (req, res) => {
  res.json({ data: thoughtsStore.getThoughtById(req.params.id) });
});

app.post('/thoughts/', (req, res) => {
  const data = req.body;
  if (validateThought(data)) {
    const thought = thoughtsStore.createThought(data);
    res.json({ data: thought });
  } else {
    res.status(400).send();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
