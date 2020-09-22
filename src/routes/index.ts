import { Router } from 'express';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/auth', sessionsRouter);

export default routes;
