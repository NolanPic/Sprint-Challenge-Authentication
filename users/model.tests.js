const Users = require('./model');
const db = require('../database/dbConfig');

describe('Users model', () => {
    beforeEach(async () => {
        await db.truncate();
    });
});