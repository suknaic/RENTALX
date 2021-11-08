import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoryController } from '../modules/cars/useCases/listCategory/ListCategoryController';

const upload = multer({
  dest: '/tmp',
});

const CategoriRouter = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoryController();

CategoriRouter.post('/', createCategoryController.handle);

CategoriRouter.get('/', listCategoryController.handle);

CategoriRouter.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle
);

export { CategoriRouter };
