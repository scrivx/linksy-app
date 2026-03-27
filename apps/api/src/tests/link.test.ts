import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../server.js';
import * as service from '../services/link.service.js';

// Mock the service layer to avoid hitting the actual database during these tests
vi.mock('../services/link.service.js', () => ({
  createShortLink: vi.fn(),
  getLink: vi.fn(),
  registerClick: vi.fn(),
  getLinkStats: vi.fn(),
}));

describe('Link Controller Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/links', () => {
    it('should return 400 for invalid URL payload', async () => {
      const response = await request(app)
        .post('/api/links')
        .send({ url: 'not-a-url', alias: 'test' });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 200 and create link successfully', async () => {
      const mockLink = { id: '1', alias: 'my-alias', original_url: 'https://example.com' };
      vi.mocked(service.createShortLink).mockResolvedValue(mockLink as any);

      const response = await request(app)
        .post('/api/links')
        .send({ url: 'https://example.com', alias: 'my-alias' });

      expect(response.status).toBe(200);
      expect(response.body.data.alias).toBe('my-alias');
      expect(response.body.shortUrl).toContain('my-alias');
    });
  });

  describe('GET /:alias', () => {
    it('should return 404 if link not found', async () => {
      vi.mocked(service.getLink).mockResolvedValue(null);

      const response = await request(app).get('/non-existent');
      
      expect(response.status).toBe(404);
    });

    it('should redirect 302 and cache to original url if found', async () => {
      const mockLink = { id: '1', alias: 'found-link', original_url: 'https://example.com' };
      vi.mocked(service.getLink).mockResolvedValue(mockLink as any);
      vi.mocked(service.registerClick).mockResolvedValue(undefined as any);

      const response = await request(app).get('/found-link');

      expect(response.status).toBe(302);
      expect(response.header.location).toBe('https://example.com');
      expect(response.header['cache-control']).toBe('public, max-age=60');
      expect(service.registerClick).toHaveBeenCalledWith('found-link');
    });
  });
});
