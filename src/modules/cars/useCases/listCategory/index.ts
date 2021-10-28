import { CategoriRepository } from '../../repositories/CategorieRepositories';
import { ListCategoryController } from './ListCategoryController';
import { ListCategoryUseCase } from './ListCategoryUseCase';

const categoryRepository = new CategoriRepository();
const listCategoryUsecase = new ListCategoryUseCase(categoryRepository);
const listCategoryController = new ListCategoryController(listCategoryUsecase);

export { listCategoryController };
