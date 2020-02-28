const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

describe('Jokes router', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });

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

        test('responds with jokes when a valid token is given', async () => {
            const user = {
                username: 'Bill',
                password: 'thisisaREALLYGoodPwD'
            };

            // create user
            const res = await request(server)
                .post('/api/auth/register')
                .send(user);

            const { token } = res.body;

            const jokesRes = await request(server)
                .get('/api/jokes')
                .set('Authorization', token);

            expect(jokesRes.status).toBe(200);
            expect(Array.isArray(jokesRes.body)).toBe(true);
        });
    });
});