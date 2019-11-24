const db = require('../data/dbConfig');

module.exports = {
    getAllData,
    add,
    login
    
}

function getAllData() {
    return db('login');
};

function add(data) {
    return db('login')
    .insert(data);
}

function login(params) {
    return db('login')
    .insert(params);
}

