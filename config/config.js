const { readFileToString } = require('../app/util/readFile');
const { PostgresDialect } = require('@sequelize/postgres')

require('dotenv').config(); 

const commonConfig = {
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
};

const testConfig = () => {
  commonConfig.database = process.env.DB_DATABASE_TEST;
  commonConfig.username = process.env.DB_USERNAME_TEST;
  commonConfig.password = process.env.DB_PASSWORD_TEST;
  commonConfig.host = process.env.DB_HOST_TEST;
  commonConfig.port = process.env.DB_PORT_TEST;
  return commonConfig;
};

const prodConfig = () => {
  commonConfig.database = process.env.DB_DATABASE_PROD;
  commonConfig.username = process.env.DB_USERNAME_PROD;
  commonConfig.password = process.env.DB_PASSWORD_PROD;
  commonConfig.host = process.env.DB_HOST_PROD;
  commonConfig.port = process.env.DB_PORT_PROD;
  return commonConfig;
};

module.exports = {
  development: {
    ...commonConfig,
  },
  production: {
    ...prodConfig(),
    url: process.env.DB_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
        ca: readFileToString('ca-certificate.crt'),
      },
    },
  },
  test: {
    ...testConfig(),
  },
};