import { Router } from 'express';

import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const passwordRoutes = Router();
const sendForgotPasswordController = new SendForgotPasswordMailController();

passwordRoutes.post('/forgot', sendForgotPasswordController.handle);

export { passwordRoutes };
