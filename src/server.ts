import 'dotenv/config';
import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { ValidationError } from 'yup';

import AppError from './errors/AppErrors';
import logger from './services/logger';
import routes from './routes';

import './database';

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err instanceof ValidationError) {
    return response.status(422).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  logger.info('Server started on port 3333');
});
