import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';
import { CreateSpecificationController } from './CreateSpecificationController';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

const specificationRepository = new SpecificationsRepository();
const createSpecificationUSeCase = new CreateSpecificationUseCase(
  specificationRepository
);

const createSpecificationController = new CreateSpecificationController(
  createSpecificationUSeCase
);

export { createSpecificationController };
