import { container } from 'tsyringe';

import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import { IMailProvider } from './model/IMailProvider';

container.registerSingleton<IMailProvider>(
  'IMailProvider',
  EtherealMailProvider
);
