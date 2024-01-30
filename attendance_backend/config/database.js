const knex = require('knex');
require('dotenv').config();

const connection = {
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        charset: 'utf8',
        port: process.env.DB_PORT || 3306,
        connectionLimit: 10,
    }
}


module.exports = knex(connection);