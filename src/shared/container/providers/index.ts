import { container } from 'tsyringe';

import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider';
import { IDateProvider } from './DateProvider/model/IDateProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { IMailProvider } from './MailProvider/model/IMailProvider';

container.registerSingleton<IDateProvider>('IDateProvider', DayjsDateProvider);

container.registerInstance<IMailProvider>(
  'IMailProvider',
  new EtherealMailProvider()
);
