import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { ensureAdmin } from '@shared/infra/http/middleware/ensureAdmin';
import { ensureAuthenticate } from '@shared/infra/http/middleware/ensureAuthenticate';

const carRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carRoutes.post(
  '/',
  ensureAuthenticate,
  ensureAdmin,
  createCarController.handle
);

carRoutes.get('/available', listAvailableCarsController.handle);

carRoutes.post(
  '/specifications/:car_id',
  createCarSpecificationController.handle
);

export { carRoutes };
