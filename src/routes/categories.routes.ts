import { Router } from 'express';

import { CategoriRepository } from '../repositories/CategorieRepositories';

const CategoriRouter = Router();

const categoryRepository = new CategoriRepository();

CategoriRouter.post('/', (request, response) => {
  const { name, description } = request.body;

  const categoryAlredyExist = categoryRepository.findByName(name);

  if (categoryAlredyExist) {
    return response.status(400).json({ error: 'Category Alredy Existis' });
  }

  categoryRepository.create({ name, description });

  return response.status(201).send();
});

CategoriRouter.get('/', (request, response) => {
  const all = categoryRepository.list();

  return response.json(all);
});

export { CategoriRouter };
