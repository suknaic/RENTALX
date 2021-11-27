import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ensureAdmin } from '@shared/infra/http/middleware/ensureAdmin';
import { ensureAuthenticate } from '@shared/infra/http/middleware/ensureAuthenticate';

const carRoutes = Router();

const createCarController = new CreateCarController();

carRoutes.post(
  '/',
  ensureAuthenticate,
  ensureAdmin,
  createCarController.handle
);

export { carRoutes };
