require('dotenv').config();
const env = process.env;

const development = {
    username: env.DB_USER_NAME,
    password: env.DB_PASSWORD,
    database: env.DB_DEV,
    host: 'localhost',
    port: env.DB_PORT,
    dialect: env.DB_DIALECT
};

const test = {
    username: env.DB_USER_NAME,
    password: env.DB_PASSWORD,
    database: env.DB_DEV,
    host: 'localhost',
    port: env.DB_PORT,
    dialect: env.DB_DIALECT
};

const production = {
    username: env.DB_USER_NAME,
    password: env.DB_PASSWORD,
    database: env.DB_PROD,
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: env.DB_DIALECT
};

module.exports = { development, test, production };
