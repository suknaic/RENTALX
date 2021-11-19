import { Router } from 'express';

import { ensureAuthenticate } from '../middleware/ensureAuthenticate';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const SpecificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

SpecificationsRoutes.post(
  '/',
  ensureAuthenticate,
  createSpecificationController.handle
);

export { SpecificationsRoutes };
