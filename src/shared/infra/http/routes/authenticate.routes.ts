import { Router } from 'express';

import { AuthenticateUserController } from '@modules/accounts/useCases/authenticate/AuthenticateUserController';

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateRoutes.post('/', authenticateUserController.handle);

export { authenticateRoutes };
