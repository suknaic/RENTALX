import 'reflect-metadata';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';

import '@shared/container';

import { AppError } from '@shared/error/AppError';
import createConnection from '@shared/infra/typeorm';

import swaggerFile from '../../../swagger.json';
import routes from './routes';

createConnection();

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json(err.message);
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal Server Error ${err.message}`,
    });
  }
);

app.listen(3333, () => console.log('server is running on port 3333 ✔'));
