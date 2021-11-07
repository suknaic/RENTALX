import { CategoryRepository } from '../../repositories/implementations/CategoryRepositories';
import { ImportCategoryController } from './ImportCategoryController';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

export default (): ImportCategoryController => {
  const categoryRepository = new CategoryRepository();
  const importCategoryUseCase = new ImportCategoryUseCase(categoryRepository);
  const importCategoryController = new ImportCategoryController(
    importCategoryUseCase
  );

  return importCategoryController;
};
