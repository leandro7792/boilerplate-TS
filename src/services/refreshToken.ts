import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import AppError from '../errors/AppErrors';
import User from '../models/User';

interface Request {
  id: number;
}

interface Response {
  jwt: string;
}

class RefreshTokenService {
  public async execute({ id }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { id } });

    if (!user) throw new AppError('Invalid user ID', 401);

    const jwt = sign({ id: user.id }, 'af5edf58a54cd21da434be5b1be6b918', {
      expiresIn: '1d',
    });

    return {
      jwt,
    };
  }
}

export default RefreshTokenService;
