const { updateEnvVariables } = require('../app/util/env.handler');
const { readFileToString } = require('../app/util/readFile');

const databaseEnvVariables = [
  'DB_DATABASE',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_HOST',
  'DB_PORT',
];
updateEnvVariables(databaseEnvVariables);

require('dotenv').config(); // this is important!

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

module.exports = {
  development: {
    ...commonConfig,
  },
  production: {
    url: process.env.DB_URL,
    dialect: 'postgres',
    define: {
      freezeTableName: true,
    },
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