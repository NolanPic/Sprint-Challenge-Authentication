const Users = require('./model');
const db = require('../database/dbConfig');

test('database environment set to "testing"', () => {
    expect(process.env.DB_ENV).toBe('testing');
});

describe('Users model', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });

    test('Create user returns new user', async () => {
        const user = {
            username: 'Jared',
            password: 'thisisaREALLYGoodPwD'
        };
        const createdUser = await Users.create(user);

        expect(createdUser).toMatchObject(user);
        expect(createdUser.id).toBeDefined();
    });

    test('Get users returns array of users', async () => {
        const users = await Users.get();

        expect(Array.isArray(users)).toBe(true);
        expect(users).toHaveLength(0);
    });

    test('Get by ID returns a user by their ID', async () => {
        const user = {
            username: 'Jared',
            password: 'thisisaREALLYGoodPwD'
        };
        const { id: userId } = await Users.create(user);

        const userById = await Users.getById(userId);
        expect(userById).toBeDefined();
        expect(userById).toMatchObject(user);
        expect(userById.username).toBe(user.username);
        expect(userById.id).toBe(userId);
    });

    test('Get by username returns a user by their username', async () => {
        const user = {
            username: 'Jared',
            password: 'thisisaREALLYGoodPwD'
        };
        await Users.create(user);

        const userByUsername = await Users.getByUsername(user.username);
        expect(userByUsername).toBeDefined();
        expect(userByUsername).toMatchObject(user);
        expect(userByUsername.username).toBe(user.username);
    });
});