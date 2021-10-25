import express from 'express';

import { CategoriRouter } from './routes/categories.routes';

const app = express();

app.use(express.json());

app.use(CategoriRouter);

app.listen(3333, () => console.log('server is running on port 3333 ✔'));
