const request = require('supertest');
const server = require('../api/server');

describe('Jokes router', () => {
    describe('GET /', () => {
        test('responds with 401 without token', async () => {
            const res = await request(server).get('/api/jokes');

            expect(res.status).toBe(401);
        });

        test('responds with an authentication error without token', async () => {
            const res = await request(server).get('/api/jokes');

            expect(res.body.you).toBeDefined();
            expect(res.body.you).toBe('shall not pass!');
        });
    });
});