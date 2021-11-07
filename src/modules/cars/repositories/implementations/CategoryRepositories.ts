import { getRepository, Repository } from 'typeorm';

import { ICreateCategoriDTO } from '../../../../dtos/ICreateCategoryDTO';
import { Category } from '../../entities/Category';
import { ICategoryRepository } from '../ICategoryRepository';

class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  private static INSTANCE: CategoryRepository;

  private constructor() {
    this.repository = getRepository(Category);
  }

  public static getInstance(): CategoryRepository {
    if (!CategoryRepository.INSTANCE) {
      CategoryRepository.INSTANCE = new CategoryRepository();
    }

    return CategoryRepository.INSTANCE;
  }

  async create({ name, description }: ICreateCategoriDTO): Promise<void> {
    const categori = this.repository.create({
      name,
      description,
    });
    await this.repository.save(categori);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name });
    return category;
  }
}

export { CategoryRepository };
