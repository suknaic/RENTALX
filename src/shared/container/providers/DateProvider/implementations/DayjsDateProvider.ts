import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../model/IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  dateNow(): Date {
    return dayjs().toDate();
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  compareInHours(start: Date, end: Date): number {
    const utcStart = this.convertToUTC(start);
    const utcEnd = this.convertToUTC(end);

    return dayjs(utcStart).diff(utcEnd, 'hours');
  }
  compareInDays(start_date: Date, end_date: Date): number {
    const utcStart = this.convertToUTC(start_date);
    const utcEnd = this.convertToUTC(end_date);

    return dayjs(utcStart).diff(utcEnd, 'days');
  }
}

export { DayjsDateProvider };
