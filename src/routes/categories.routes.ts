import { Router } from 'express';
import multer from 'multer';

import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { listCategoryController } from '../modules/cars/useCases/listCategory';

const upload = multer({
  dest: '/tmp',
});

const CategoriRouter = Router();
CategoriRouter.post('/', (request, response) => {
  return createCategoryController.handle(request, response);
});

CategoriRouter.get('/', (request, response) => {
  return listCategoryController.handle(request, response);
});

CategoriRouter.post('/import', upload.single('file'), (request, response) => {
  const { file } = request;

  console.log(file);
  return response.send();
});

export { CategoriRouter };
