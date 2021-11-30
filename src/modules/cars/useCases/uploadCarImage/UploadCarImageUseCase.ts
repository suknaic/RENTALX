import { inject, injectable } from 'tsyringe';

import { ICarImageRepository } from '@modules/cars/repositories/ICarImageRepository';

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject('ICarImageRepository')
    private carImageRepository: ICarImageRepository
  ) {}

  async execute(car_id: string, car_image: string[]): Promise<void> {
    car_image.map(async (image) => {
      const carImage = await this.carImageRepository.create(car_id, image);

      return carImage;
    });
  }
}

export { UploadCarImageUseCase };
