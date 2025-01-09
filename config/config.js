const { readFileToString } = require('../app/util/readFile');

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

module.exports = {
  production: {
    ...commonConfig,
  },
  development: {
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