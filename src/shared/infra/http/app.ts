import 'express-async-errors';
import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import '@shared/container';

import { AppError } from '@shared/error/AppError';
import createConnection from '@shared/infra/typeorm';

import swaggerFile from '../../../swagger.json';
import routes from './routes';

const app = express();
createConnection();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

app.use(
  (
    err: Error,
    request: express.Request,
    response: express.Response,
    _next: express.NextFunction
  ) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json(err.message);
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal Server Error ${err.message}`,
    });
  }
);

export { app };
