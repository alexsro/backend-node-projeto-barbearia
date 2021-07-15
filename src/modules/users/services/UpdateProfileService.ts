import { inject, injectable } from 'tsyringe';

import AppError from 'shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/iHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    const userWithEmailAlreadyExists = await this.usersRepository.findByEmail(
      email,
    );

    if (
      userWithEmailAlreadyExists &&
      userWithEmailAlreadyExists.id !== user_id
    ) {
      throw new AppError('Already exists an user with this email');
    }

    if (!user) {
      throw new AppError('User not found!');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('Old password is required');
    }
    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password not matches');
      }

      const checkPassword = await this.hashProvider.compareHash(
        password,
        user.password,
      );

      if (checkPassword) {
        throw new AppError('New password can not be equal current password');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
