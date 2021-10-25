import { Router } from 'express';

import { CategoriRepository } from '../repositories/CategorieRepositories';
import { CreateCategoryService } from '../services/CreateCategoryService';

const CategoriRouter = Router();

const categoryRepository = new CategoriRepository();

CategoriRouter.post('/', (request, response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryService(categoryRepository);

  createCategoryService.execute({ name, description });

  return response.status(201).send();
});

CategoriRouter.get('/', (request, response) => {
  const all = categoryRepository.list();

  return response.json(all);
});

export { CategoriRouter };
