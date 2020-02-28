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

        test('creates a user', async () => {
            const user = {
                username: 'Jared',
                password: 'thisisaREALLYGoodPwD'
            };
            await request(server)
                .post('/api/auth/register')
                .send(user);
            
            const userWithThisUsername = await Users.getByUsername(user.username);
            expect(userWithThisUsername).toBeDefined();
            expect(userWithThisUsername.id).toBeDefined();
        });

        test('responds with 400 if body is invalid', async () => {
            const user = {
                username: '',
                password: ''
            };
            const res = await request(server)
                .post('/api/auth/register')
                .send(user);
            
            expect(res.status).toBe(400);
        });

        test('responds with 409 conflict if username is taken', async () => {
            const user = {
                username: 'Jared',
                password: 'thisisaREALLYGoodPwD'
            };

            await Users.create(user);

            const res = await request(server)
                .post('/api/auth/register')
                .send(user);

            expect(res.status).toBe(409);
            expect(res.body.error).toBeDefined();
        });
    });

    describe('POST /api/auth/login', () => {
        test('responds with 200', async () => {
            const user = {
                username: 'Jared',
                password: 'thisisaREALLYGoodPwD'
            };
            await request(server)
                .post('/api/auth/register')
                .send(user);
            
            const res = await request(server)
                .post('/api/auth/login')
                .send(user);
            
            expect(res.status).toBe(200);
        });

        test('responds with token', async () => {
            const user = {
                username: 'Jared',
                password: 'thisisaREALLYGoodPwD'
            };
            await request(server)
                .post('/api/auth/register')
                .send(user);
            
            const res = await request(server)
                .post('/api/auth/login')
                .send(user);
            
            expect(res.type).toMatch(/json/i);
            expect(res.body.token).toBeDefined();
        });

        test('responds with 400 if body is invalid', async () => {
            const user = {
                username: '',
                password: ''
            };

            const res = await request(server)
                .post('/api/auth/login')
                .send(user);

            expect(res.status).toBe(400);
            expect(res.body.error).toBeDefined();
        });

        test('responds with 401 if credentials are invalid', async () => {
            const user = {
                username: 'Jared',
                password: 'thisisaREALLYGoodPwD'
            };

            const res = await request(server)
                .post('/api/auth/login')
                .send(user);
            
            expect(res.status).toBe(401);
            expect(res.body.error).toBeDefined();
        });
    })
});