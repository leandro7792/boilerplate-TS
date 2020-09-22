import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../../models/User';
import userSeed from '../seed/user.seed';

export default class SeedUser1600806688943 implements MigrationInterface {
  public async up(): Promise<void> {
    const usersRepository = getRepository(User);

    const hashedPassword = await hash(userSeed.password, 8);

    const user = usersRepository.create({
      username: userSeed.username,
      password: hashedPassword,
    });

    await usersRepository.save(user);
  }

  public async down(): Promise<void> {}
}
