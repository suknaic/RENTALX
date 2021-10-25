import { ICreateCategoriDTO } from '../DTO/ICreateCategoryDTO';
import { Category } from '../model/Category';
import { ICategoryRepository } from './ICategoryRepository';

class CategoriRepository implements ICategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoriDTO): void {
    const categori = new Category();
    Object.assign(categori, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(categori);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((cat) => cat.name === name);
    return category;
  }
}

export { CategoriRepository };
