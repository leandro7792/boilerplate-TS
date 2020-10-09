import { Router } from 'express';
import sessionsRouter from './sessions.routes';

import ensureAuthenticate from '../middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/auth', sessionsRouter);

routes.use(ensureAuthenticate);

// routes.use('/entities', entitiesRouter);

export default routes;
