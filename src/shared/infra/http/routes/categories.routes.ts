import { Router } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoryController } from '@modules/cars/useCases/listCategory/ListCategoryController';

const upload = multer({
  dest: '/tmp',
});

const categoryRoutes = Router();

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoryController();

categoryRoutes.post('/', createCategoryController.handle);

categoryRoutes.get('/', listCategoryController.handle);

categoryRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle
);

export { categoryRoutes };
