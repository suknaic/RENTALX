import { CategoryRepository } from '../../repositories/CategoryRepositories';
import { ListCategoryController } from './ListCategoryController';
import { ListCategoryUseCase } from './ListCategoryUseCase';

const categoryRepository = CategoryRepository.getInstance();
const listCategoryUsecase = new ListCategoryUseCase(categoryRepository);
const listCategoryController = new ListCategoryController(listCategoryUsecase);

export { listCategoryController };
