import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../model/IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  dateNow(): Date {
    return dayjs().toDate();
  }

  compareInHours(start: Date, end: Date): number {
    const utcStart = this.convertToUTC(start);
    const utcEnd = this.convertToUTC(end);

    return dayjs(utcStart).diff(utcEnd, 'hours');
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
}

export { DayjsDateProvider };
