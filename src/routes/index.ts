import { Router } from 'express';

import { CategoriRouter } from './categories.routes';
import { SpecificationsRoutes } from './specifications.routes';

const routes = Router();

routes.use('/categories', CategoriRouter);
routes.use('/specifications', SpecificationsRoutes);

export default routes;
