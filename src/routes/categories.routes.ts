import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';

const CategoriRouter = Router();

const categorie = [];

CategoriRouter.post('/', (request, response) => {
  const { name, description } = request.body;

  const categori = {
    id: uuidv4(),
    name,
    description,
    created_at: new Date(),
  };

  categorie.push(categori);

  return response.status(201).send();
});

export { CategoriRouter };
