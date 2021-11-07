import { Router } from 'express';
import multer from 'multer';

import createCategoryController from '../modules/cars/useCases/createCategory';
import importCategoryController from '../modules/cars/useCases/importCategory';
import listCategoryController from '../modules/cars/useCases/listCategory';

const upload = multer({
  dest: '/tmp',
});

const CategoriRouter = Router();
CategoriRouter.post('/', async (request, response) => {
  return createCategoryController().handle(request, response);
});

CategoriRouter.get('/', async (request, response) => {
  return listCategoryController().handle(request, response);
});

CategoriRouter.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController().handle(request, response);
});

export { CategoriRouter };
