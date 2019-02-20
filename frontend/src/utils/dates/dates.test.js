import { formatDate } from './dates';

describe('Format data in the the format DD/MM/YY', () => {
  const date = new Date('Tue Feb 19 2019 12:04:06 GMT+0200 (Eastern European Standard Time)');

  it('Should format date correctly', () => {
    const formatedDate = formatDate(date);
    expect(formatedDate).toBe('19/2/19');
  });

  it('On wrong parameters shuld return empty string', () => {
    const formatedDate = formatDate(null);
    expect(formatedDate).toBe('');
  });
});
