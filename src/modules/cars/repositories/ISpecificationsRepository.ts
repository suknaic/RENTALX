import { ICreateSpecificationsDTO } from '../dtos/ICreateSpecificationsDTO';
import { Specification } from '../infra/typeorm/entities/Specification';

interface ISpecificationsRepository {
  create({
    name,
    description,
  }: ICreateSpecificationsDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findByIds(specifications_id: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository };
