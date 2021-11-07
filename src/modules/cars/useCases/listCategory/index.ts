import { CategoryRepository } from '../../repositories/implementations/CategoryRepositories';
import { ListCategoryController } from './ListCategoryController';
import { ListCategoryUseCase } from './ListCategoryUseCase';

export default (): ListCategoryController => {
  const categoryRepository = new CategoryRepository();
  const listCategoryUsecase = new ListCategoryUseCase(categoryRepository);
  const listCategoryController = new ListCategoryController(
    listCategoryUsecase
  );

  return listCategoryController;
};
