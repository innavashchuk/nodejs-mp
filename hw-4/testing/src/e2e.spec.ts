import request from 'supertest';
import { PUBLIC_HOLIDAYS_API_URL } from './config';

describe('Nager.Date API', () => {
  describe('/CountryInfo', () => {
    it('should return 200 and country information', async () => {
      const response = await request(PUBLIC_HOLIDAYS_API_URL).get('/CountryInfo/GB');

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        commonName: expect.any(String),
        officialName: expect.any(String),
        countryCode: expect.any(String),
        region: expect.any(String),
        borders: expect.any(Array),
      });
    });

    it('should return 404 for a non-existent country', async () => {
      const response = await request(PUBLIC_HOLIDAYS_API_URL).get('/CountryInfo/AA');

      expect(response.status).toBe(404);
    });
  });

  describe('/NextPublicHolidays', () => {
    it('should return 200 and a list of next public holidays', async () => {
      const response = await request(PUBLIC_HOLIDAYS_API_URL).get('/NextPublicHolidays/GB');

      expect(response.status).toBe(200);
      expect(response.body).not.toHaveLength(0);
    });

    it('should return 500 for a non-existent country', async () => {
      const response = await request(PUBLIC_HOLIDAYS_API_URL).get('/NextPublicHolidays/AA');

      expect(response.status).toBe(500);
    });
  });
});
