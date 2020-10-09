import { Request, Response, Router } from 'express';
import * as yup from 'yup';

import AuthenticationService from '../services/authentication';
import RefreshToken from '../services/refreshToken';
import ChangePassword from '../services/changePassword';
import ensureAuthenticate from '../middlewares/ensureAuthenticated';

const sessionsRouter = Router();

/**
 * Login
 */
sessionsRouter.post('/', async (request: Request, response: Response) => {
  const loginSchema = yup
    .object({
      username: yup.string().defined(),
      password: yup.string().defined(),
    })
    .defined();

  const { username, password } = await loginSchema.validate(request.body);

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
  async (request: Request, response: Response) => {
    const schema = yup
      .object({
        oldPassword: yup.string().defined(),
        newPassword: yup.string().defined(),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref('newPassword')], "confirmPassword don't match")
          .defined(),
      })
      .defined();

    const { oldPassword, newPassword } = await schema.validate(request.body);

    const { id } = request.user;

    const changePass = new ChangePassword();

    const { username } = await changePass.execute({
      id,
      oldPassword,
      newPassword,
    });

    return response.json({
      username,
      newPassword,
    });
  },
);

/**
 * Update Token
 */
sessionsRouter.put(
  '/',
  ensureAuthenticate,
  async (request: Request, response: Response) => {
    const { id } = request.user;

    const refresh = new RefreshToken();

    const { jwt } = await refresh.execute({ id });

    return response.json({ jwt });
  },
);

export default sessionsRouter;
