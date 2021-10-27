import { Router } from 'express';

// import { CategoriRepository } from '../modules/cars/repositories/CategorieRepositories';
import { CategoryController } from '../modules/cars/useCases/createCategory';

const CategoriRouter = Router();
CategoriRouter.post('/', (request, response) => {
  return CategoryController.handle(request, response);
});

// CategoriRouter.get('/', (request, response) => {
//   const all = categoryRepository.list();

//   return response.json(all);
// });

export { CategoriRouter };
