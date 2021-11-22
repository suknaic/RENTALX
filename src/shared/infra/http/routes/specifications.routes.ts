import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAuthenticate } from '@shared/infra/http/middleware/ensureAuthenticate';

const SpecificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

SpecificationsRoutes.post(
  '/',
  ensureAuthenticate,
  createSpecificationController.handle
);

export { SpecificationsRoutes };
