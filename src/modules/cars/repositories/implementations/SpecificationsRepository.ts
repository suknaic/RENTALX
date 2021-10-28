import { ICreateSpecificationsDTO } from '../../../../dtos/ICreateSpecificationsDTO';
import { Specification } from '../../model/Specification';
import { ISpecificationsRepository } from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ name, description }: ICreateSpecificationsDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }

  findByName(name): Specification {
    const specification = this.specifications.find(
      (specifications) => specifications.name === name
    );

    return specification;
  }
}

export { SpecificationsRepository };
