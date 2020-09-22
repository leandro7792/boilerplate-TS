import { Request, Response, Router } from 'express';

import AuthenticationService from '../services/authentication';

const sessionsRouter = Router();

/**
 * Login
 */
sessionsRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { username, password } = request.body;

    const AuthService = new AuthenticationService();

    await AuthService.execute({
      username,
      password,
    });

    return response.json({ ok: true });
  } catch (error) {
    return response
      .status(401)
      .json({ status: 'error', message: 'authentication fail' });
  }

  return response.json(data);
});

/**
 * Update Password
 */
sessionsRouter.put('/password', (request: Request, response: Response) => {
  const data = request.body;

  return response.json(data);
});

/**
 * Update Token
 */
sessionsRouter.put('/', (request: Request, response: Response) => {
  const data = request.body;

  return response.json(data);
});

export default sessionsRouter;
