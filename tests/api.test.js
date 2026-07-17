const request = require('supertest');
const app = require('../src/app');

describe('CrimeReport API', () => {
  describe('GET /api/reports', () => {
    it('should return all crime reports', async () => {
      const res = await request(app)
        .get('/api/reports')
        .expect(200);
      
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return reports with location data', async () => {
      const res = await request(app)
        .get('/api/reports')
        .expect(200);
      
      if (res.body.length > 0) {
        expect(res.body[0]).toHaveProperty('latitude');
        expect(res.body[0]).toHaveProperty('longitude');
      }
    });
  });

  describe('POST /api/reports', () => {
    it('should create a new crime report', async () => {
      const newReport = {
        type: 'theft',
        description: 'Test report',
        latitude: 40.7128,
        longitude: -74.0060,
        timestamp: new Date().toISOString()
      };

      const res = await request(app)
        .post('/api/reports')
        .send(newReport)
        .expect(201);
      
      expect(res.body).toHaveProperty('id');
      expect(res.body.type).toBe('theft');
    });

    it('should reject invalid report data', async () => {
      const invalidReport = {
        type: '',
        description: '',
        latitude: 'invalid',
        longitude: 'invalid'
      };

      await request(app)
        .post('/api/reports')
        .send(invalidReport)
        .expect(400);
    });
  });

  describe('GET /api/reports/:id', () => {
    it('should return a specific report', async () => {
      const res = await request(app)
        .get('/api/reports/1')
        .expect(200);
      
      expect(res.body).toHaveProperty('id');
    });

    it('should return 404 for non-existent report', async () => {
      await request(app)
        .get('/api/reports/99999')
        .expect(404);
    });
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const res = await request(app)
        .get('/api/health')
        .expect(200);
      
      expect(res.body.status).toBe('ok');
    });
  });
});
