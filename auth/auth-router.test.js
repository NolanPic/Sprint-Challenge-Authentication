const request = require('supertest');
const server = require('../api/server');
const Users = require('../users/model');
const db = require('../database/dbConfig');

describe('Users router', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });

    describe('POST /api/auth/register', () => {
        test('responds with 201', async () => {
            const user = {
                username: 'Jared',
                password: 'thisisaREALLYGoodPwD'
            };
            const res = await request(server)
                .post('/api/auth/register')
                .send(user);
            expect(res.status).toBe(201);
        });

        test('responds with the token', async () => {
            const user = {
                username: 'Jared',
                password: 'thisisaREALLYGoodPwD'
            };
            const res = await request(server)
                .post('/api/auth/register')
                .send(user);
            expect(res.type).toMatch(/json/i);
            expect(res.body.token).toBeDefined();
        });
    });
});