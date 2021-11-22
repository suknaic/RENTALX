import { inject, injectable } from 'tsyringe';

import { IUSerRepository } from '@modules/accounts/repositories/IUserRepository';
import { deletefile } from '@utils/file';

interface IRequest {
  user_id: string;
  avatar_file: string;
}
@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('IUSerRepository')
    private userRepository: IUSerRepository
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (user.avatar) await deletefile(`./tmp/avatar/${user.avatar}`);

    user.avatar = avatar_file;

    await this.userRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
