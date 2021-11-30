import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImage/UploadCarImagesController';
import { ensureAdmin } from '@shared/infra/http/middleware/ensureAdmin';
import { ensureAuthenticate } from '@shared/infra/http/middleware/ensureAuthenticate';

const carRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload('./tmp/cars'));

carRoutes.post(
  '/',
  ensureAuthenticate,
  ensureAdmin,
  createCarController.handle
);

carRoutes.get('/available', listAvailableCarsController.handle);

carRoutes.post(
  '/specifications/:car_id',
  ensureAuthenticate,
  ensureAdmin,
  createCarSpecificationController.handle
);

carRoutes.post(
  '/upload/:id',
  ensureAuthenticate,
  ensureAdmin,
  upload.array('files'),
  uploadCarImagesController.handle
);

export { carRoutes };
