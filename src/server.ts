import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';

import routes from './routes';
import logger from './services/logger';

import './database';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333, () => {
  logger.info('Server started on port 3333');
});
