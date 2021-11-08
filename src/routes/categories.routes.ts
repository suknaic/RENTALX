import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import importCategoryController from '../modules/cars/useCases/importCategory';
import listCategoryController from '../modules/cars/useCases/listCategory';

const upload = multer({
  dest: '/tmp',
});

const CategoriRouter = Router();

const createCategoryController = new CreateCategoryController();

CategoriRouter.post('/', createCategoryController.handle);

CategoriRouter.get('/', async (request, response) => {
  return listCategoryController().handle(request, response);
});

CategoriRouter.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController().handle(request, response);
});

export { CategoriRouter };
