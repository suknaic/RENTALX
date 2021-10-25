import { Router } from 'express';

import { Category } from '../model/Category';

const CategoriRouter = Router();

const categorie: Category[] = [];

CategoriRouter.post('/', (request, response) => {
  const { name, description } = request.body;

  const categori = new Category();

  Object.assign(categori, {
    name,
    description,
    created_at: new Date(),
  });

  categorie.push(categori);

  return response.status(201).json(categorie);
});

export { CategoriRouter };
