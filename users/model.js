const db = require('../database/dbConfig');

module.exports = {
    create,
    get,
    getById,
    getByUsername
};

async function create(user) {
    const [id] = await db('users')
        .insert(user, 'id');
    return getById(id);
}

async function get() {
    return db('users');
}

async function getById(id) {
    return db('users')
        .where({ id })
        .first();
}

async function getByUsername(username) {
    return db('users')
        .where({ username })
        .first();
}
