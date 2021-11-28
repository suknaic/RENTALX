import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { ensureAdmin } from '@shared/infra/http/middleware/ensureAdmin';
import { ensureAuthenticate } from '@shared/infra/http/middleware/ensureAuthenticate';

const carRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carRoutes.post(
  '/',
  ensureAuthenticate,
  ensureAdmin,
  createCarController.handle
);

carRoutes.get('/available', listAvailableCarsController.handle);

export { carRoutes };
