import { Router } from 'express';

// import { CategoriRepository } from '../modules/cars/repositories/CategorieRepositories';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoryController } from '../modules/cars/useCases/listCategory';

const CategoriRouter = Router();
CategoriRouter.post('/', (request, response) => {
  return createCategoryController.handle(request, response);
});

CategoriRouter.get('/', (request, response) => {
  return listCategoryController.handle(request, response);
});

export { CategoriRouter };
