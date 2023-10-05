import { shortenPublicHoliday, validateInput } from './helpers';
import { PublicHoliday } from './types';

describe('validateInput', () => {
  it('should validate a valid country', () => {
    const validCountry = 'GB'; 
    const result = validateInput({ country: validCountry });
    expect(result).toBe(true);
  });
});

  it('should throw an error for an unsupported country', () => {
    const unsupportedCountry = 'SE'; 
    expect(() => validateInput({ country: unsupportedCountry })).toThrowError(
      `Country provided is not supported, received: ${unsupportedCountry}`
    );
  });

  it('should validate the current year', () => {
    const currentYear = new Date().getFullYear();
    const result = validateInput({ year: currentYear });
    expect(result).toBe(true);
  });

  it('should throw an error for a non-current year', () => {
    const nonCurrentYear = new Date().getFullYear() - 1; 
    expect(() => validateInput({ year: nonCurrentYear })).toThrowError(
      `Year provided not the current, received: ${nonCurrentYear}`
    );
  });

  it('should validate both country and year', () => {
    const validCountry = 'FR';
    const currentYear = new Date().getFullYear();
    const result = validateInput({ country: validCountry, year: currentYear });
    expect(result).toBe(true);
  });

  it('should throw an error for an unsupported country and non-current year', () => {
    const unsupportedCountry = 'SE';
    const nonCurrentYear = new Date().getFullYear() - 1; 
    expect(() =>
      validateInput({ country: unsupportedCountry, year: nonCurrentYear })
    ).toThrowError(
      `Country provided is not supported, received: ${unsupportedCountry}`
    );
  });

describe('shortenPublicHoliday', () => {
  it('should shorten a public holiday', () => {
    const holiday = {
      name: 'Independence Day',
      localName: 'Fourth of July',
      date: '2023-07-04',
    };
    const shortenedHoliday = shortenPublicHoliday(holiday as PublicHoliday);
    expect(shortenedHoliday).toEqual({
      name: 'Independence Day',
      localName: 'Fourth of July',
      date: '2023-07-04',
    });
  });
});
