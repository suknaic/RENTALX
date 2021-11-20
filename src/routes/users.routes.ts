import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import { ensureAuthenticate } from '../middleware/ensureAuthenticate';
import { CreateUserController } from '../modules/accounts/useCases/createuser/CreateUserController';
import { UpdateUserAvatarController } from '../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const createUsersController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post('/', createUsersController.handle);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticate,
  uploadAvatar.single('file'),
  updateUserAvatarController.handle
);

export { usersRoutes };
