import { Router } from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { carRoutes } from './car.routes';
import { categoryRoutes } from './categories.routes';
import { passwordRoutes } from './password.routes';
import { rentalRoutes } from './rental.routes';
import { SpecificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/car', carRoutes);
routes.use('/categories', categoryRoutes);
routes.use('/specifications', SpecificationsRoutes);
routes.use('/users', usersRoutes);
routes.use('/', authenticateRoutes);
routes.use('/rental', rentalRoutes);
routes.use('/password', passwordRoutes);

export default routes;
