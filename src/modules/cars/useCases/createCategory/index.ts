import { CategoriRepository } from '../../repositories/CategorieRepositories';
import { CreateCategoryController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

const categoryRepository = new CategoriRepository();
const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
const CategoryController = new CreateCategoryController(createCategoryUseCase);

export { CategoryController };
