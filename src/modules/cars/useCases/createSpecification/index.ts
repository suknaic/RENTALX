import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';
import { CreateSpecificationController } from './CreateSpecificationController';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

export default () => {
  const specificationRepository = new SpecificationsRepository();
  const createSpecificationUSeCase = new CreateSpecificationUseCase(
    specificationRepository
  );

  const createSpecificationController = new CreateSpecificationController(
    createSpecificationUSeCase
  );

  return createSpecificationController;
};
