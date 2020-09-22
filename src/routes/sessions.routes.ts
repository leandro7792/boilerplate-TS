import { Request, Response, Router } from 'express';

import AuthenticationService from '../services/authentication';
import ensureAuthenticate from '../middlewares/ensureAuthenticated';

const sessionsRouter = Router();

/**
 * Login
 */
sessionsRouter.post('/', async (request: Request, response: Response) => {
  const { username, password } = request.body;

  const AuthService = new AuthenticationService();

  const { user, jwt } = await AuthService.execute({
    username,
    password,
  });

  return response.json({
    username: user.username,
    jwt,
  });
});

/**
 * Update Password
 */
sessionsRouter.put(
  '/password',
  ensureAuthenticate,
  (request: Request, response: Response) => {
    const data = request.body;

    return response.json(data);
  },
);

/**
 * Update Token
 */
sessionsRouter.put(
  '/',
  ensureAuthenticate,
  (request: Request, response: Response) => {
    const data = request.body;

    return response.json(data);
  },
);

export default sessionsRouter;
