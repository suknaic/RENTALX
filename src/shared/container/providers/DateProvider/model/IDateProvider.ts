interface IDateProvider {
  dateNow(): Date;
  compareInHours(start: Date, end: Date): number;
  convertToUTC(date: Date): string;
}

export { IDateProvider };
