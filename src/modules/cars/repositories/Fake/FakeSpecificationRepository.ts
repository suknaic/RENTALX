import { ICreateSpecificationsDTO } from '@modules/cars/dtos/ICreateSpecificationsDTO';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import { ISpecificationsRepository } from '../ISpecificationsRepository';

class FakeSpecificationRepository implements ISpecificationsRepository {
  private repository: Specification[];

  constructor() {
    this.repository = [];
  }

  async create({
    name,
    description,
  }: ICreateSpecificationsDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.repository.push(specification);

    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.find((spec) => spec.name === name);

    return specification;
  }

  async findByIds(specifications_id: string[]): Promise<Specification[]> {
    const allSpecifications = this.repository.filter((specification) =>
      specifications_id.includes(specification.id)
    );

    return allSpecifications;
  }
}

export { FakeSpecificationRepository };
