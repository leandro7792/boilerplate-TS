import { getRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';

import AppError from '../errors/AppErrors';
import User from '../models/User';

interface Request {
  id: number;
  oldPassword: string;
  newPassword: string;
}

interface Response {
  username: string;
  newPassword: string;
}

class ChangePasswordService {
  public async execute({
    id,
    oldPassword,
    newPassword,
  }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { id } });

    if (!user) throw new AppError('Invalid user ID', 401);

    const passwordMatched = await compare(oldPassword, user.password);

    if (!passwordMatched)
      throw new AppError('oldPassword not matched with current one', 400);

    const password = await hash(newPassword, 8);

    await usersRepository.update(id, { password });

    return {
      username: user.username,
      newPassword,
    };
  }
}

export default ChangePasswordService;
