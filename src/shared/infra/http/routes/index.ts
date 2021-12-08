import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { carRoutes } from './car.routes';
import { categoryRoutes } from './categories.routes';
import { rentalRoutes } from './rental.routes';
import { SpecificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/car', carRoutes);
routes.use('/categories', categoryRoutes);
routes.use('/specifications', SpecificationsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', authenticateRoutes);
routes.use('/rental', rentalRoutes);

export default routes;
