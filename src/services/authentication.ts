import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '../errors/AppErrors';

import User from '../models/User';

interface Request {
  username: string;
  password: string;
}

interface Response {
  user: User;
  jwt: string;
}

class AuthenticationService {
  public async execute({ username, password }: Request): Promise<Response> {
    const message = 'Incorrect username/password combination';

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { username } });

    if (!user) throw new AppError(message, 401);

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) throw new AppError(message, 401);

    const jwt = sign({ id: user.id }, 'af5edf58a54cd21da434be5b1be6b918', {
      expiresIn: '1d',
    });

    return {
      user,
      jwt,
    };
  }
}

export default AuthenticationService;
