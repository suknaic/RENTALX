import { Router } from 'express';

import { SpecificationsRepository } from '../modules/cars/repositories/SpecificationsRepository';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationsService';

const SpecificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

SpecificationsRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const createSpecificationsService = new CreateSpecificationService(
    specificationsRepository
  );

  createSpecificationsService.execute({ name, description });

  return response.status(201).send();
});

export { SpecificationsRoutes };
