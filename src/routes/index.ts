import { Router } from 'express';

import { CategoriRouter } from './categories.routes';
import { SpecificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/categories', CategoriRouter);
routes.use('/specifications', SpecificationsRoutes);
routes.use('/users', usersRoutes);

export default routes;
