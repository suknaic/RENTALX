import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { carRoutes } from './car.routes';
import { CategoriRouter } from './categories.routes';
import { SpecificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/car', carRoutes);
routes.use('/categories', CategoriRouter);
routes.use('/specifications', SpecificationsRoutes);
routes.use('/users', usersRoutes);
routes.use('/authenticate', authenticateRoutes);

export default routes;
