import express from 'express';

import { CategoriRouter } from './routes/categories.routes';
import { SpecificationsRoutes } from './routes/specifications.routes';

const app = express();

app.use(express.json());

app.use('/categories', CategoriRouter);
app.use('/specifications', SpecificationsRoutes);

app.listen(3333, () => console.log('server is running on port 3333 ✔'));
