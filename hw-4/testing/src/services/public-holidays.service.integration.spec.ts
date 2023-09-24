import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays,
} from './public-holidays.service';

const mockAxios = new MockAdapter(axios);

const PUBLIC_HOLIDAYS_API_URL = 'https://date.nager.at/api/v3'; 

describe('public-holidays.service integration tests', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should fetch a list of public holidays for a specific year and country', async () => {
    const year = 2023;
    const country = 'GB'; 

    const mockResponse = [
      {
        date: '2023-01-01',
        name: 'New Year',
      },
    ];
    mockAxios.onGet(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`).reply(200, mockResponse);

    const result = await getListOfPublicHolidays(year, country);

    expect(result).toEqual([{ date: '2023-01-01', name: 'New Year' }]);
  });

  it('should check if today is a public holiday in a specific country', async () => {
    const country = 'GB'; 

    mockAxios.onGet(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`).reply(200);

    const result = await checkIfTodayIsPublicHoliday(country);

    expect(result).toBe(true);
  });

  it('should fetch the next public holidays for a specific country', async () => {
    const country = 'GB'; 

    const mockResponse = [
      {
        date: '2023-12-25',
        name: 'Christmas',
      },
    ];
    mockAxios.onGet(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`).reply(200, mockResponse);

    const result = await getNextPublicHolidays(country);

    expect(result).toEqual([{ date: '2023-12-25', name: 'Christmas' }]);
  });

  it('should handle API errors', async () => {
    const country = 'GB'; 

    mockAxios.onGet(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/2023/${country}`).reply(500);

    const result = await getListOfPublicHolidays(2023, country);

    expect(result).toEqual([]);
  });
});
