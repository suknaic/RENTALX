import { Router } from 'express';

const CategoriRouter = Router();

const categorie = [];

CategoriRouter.post('/categories', (request, response) => {
  const { name, description } = request.body;

  categorie.push({
    name,
    description,
    created_at: new Date(),
  });

  return response.status(201).send();
});

export { CategoriRouter };
