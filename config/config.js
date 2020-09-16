require('dotenv').config();
const env = process.env;

const development = {
    // username: env.DB_USER_NAME || 'lcth-dev',
    // password: env.DB_PASSWORD || 'password',
    // database: env.DB_DEV || 'LCTH_Dev',
    // host: env.DB_HOST || 'mysql',
    // port: env.DB_PORT || 3306,
    // dialect: env.DB_DIALECT || 'mysql'

    username: 'node_root',
    password: env.DB_PASSWORD,
    database: env.DB_DEV,
    host: 'localhost',
    port: env.DB_PORT,
    dialect: env.DB_DIALECT,
    dialectOptions: {
        decimalNumbers: true
    }
};

const test = {
    username: env.DB_USER_NAME || 'lcth-dev',
    password: env.DB_PASSWORD || 'password',
    database: env.DB_TEST || 'LCTH_Test',
    host: env.DB_HOST || 'mysql',
    port: env.DB_PORT || 3306,
    dialect: env.DB_DIALECT || 'mysql',
    dialectOptions: {
        decimalNumbers: true
    }
};

const production = {
    username: env.DB_USER_NAME,
    password: env.DB_PASSWORD,
    database: env.DB_PROD,
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: env.DB_DIALECT,
    dialectOptions: {
        decimalNumbers: true
    }
};

module.exports = { development, test, production };
