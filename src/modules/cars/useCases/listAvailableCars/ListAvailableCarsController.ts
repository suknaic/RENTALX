import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

interface IRequest {
  name?: string;
  brand?: string;
  category_id?: string;
}

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, brand, category_id } = request.query;

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const carsAvailables = await listAvailableCarsUseCase.execute({
      name,
      brand,
      category_id,
    } as IRequest);

    return response.json(carsAvailables);
  }
}

export { ListAvailableCarsController };
