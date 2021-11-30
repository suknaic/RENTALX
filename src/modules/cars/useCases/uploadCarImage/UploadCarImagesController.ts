import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImageUseCase } from './UploadCarImageUseCase';

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const files = request.files as IFiles[];

    const filenames = files.map((file) => file.filename);

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    await uploadCarImageUseCase.execute(id, filenames);

    return response.status(201).send();
  }
}

export { UploadCarImagesController };
