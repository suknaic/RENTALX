interface IDateProvider {
  dateNow(): Date;
  compareInHours(start: Date, end: Date): number;
  convertToUTC(date: Date): string;
  compareInDays(start_date: Date, end_date: Date): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
}

export { IDateProvider };
