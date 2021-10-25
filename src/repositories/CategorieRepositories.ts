import { ICreateCategoriDTO } from '../DTO/ICreateCategoryDTO';
import { Category } from '../model/Category';

class CategoriRepository {
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
}

export { CategoriRepository };
