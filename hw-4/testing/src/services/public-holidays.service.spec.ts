import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from './public-holidays.service';
import { PUBLIC_HOLIDAYS_API_URL } from '../config';

jest.mock('../helpers', () => ({
  validateInput: jest.fn(),
}));

const axiosMock = new MockAdapter(axios);

beforeEach(() => {
  axiosMock.reset();
});

describe('getListOfPublicHolidays', () => {
  it('should handle errors and return an empty array if the API call fails', async () => {
    const year = 2023;
    const country = 'SE';
    axiosMock
      .onGet(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`)
      .reply(500);

    const result = await getListOfPublicHolidays(year, country);

    expect(result).toEqual([]);
  });
});

describe('checkIfTodayIsPublicHoliday', () => {
  it('should return true if today is a public holiday in the given country', async () => {
    const country = 'GB';
    axiosMock
      .onGet(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`)
      .reply(200);

    const result = await checkIfTodayIsPublicHoliday(country);

    expect(result).toBe(true);
  });

  it('should return false if today is not a public holiday in the given country', async () => {
    const country = 'GB';
    axiosMock
      .onGet(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`)
      .reply(404); 

    const result = await checkIfTodayIsPublicHoliday(country);

    expect(result).toBe(false);
  });

  it('should handle errors and return false if the API call fails', async () => {
    const country = 'SE';
    axiosMock
      .onGet(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`)
      .reply(500); 

    const result = await checkIfTodayIsPublicHoliday(country);

    expect(result).toBe(false);
  });
});

describe('getNextPublicHolidays', () => {
  it('should handle errors and return an empty array if the API call fails', async () => {
    const country = 'SE';
    axiosMock
      .onGet(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`)
      .reply(500); 

    const result = await getNextPublicHolidays(country);

    expect(result).toEqual([]);
  });
});
