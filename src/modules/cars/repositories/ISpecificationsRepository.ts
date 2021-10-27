import { ICreateSpecificationsDTO } from '../../../dtos/ICreateSpecificationsDTO';
import { Specification } from '../model/Specification';

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationsDTO): void;
  findByName(name: string): Specification;
}

export { ISpecificationsRepository };
