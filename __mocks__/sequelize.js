const SequelizeMock = {
    define: jest.fn(),
    sync: jest.fn(),
    DataTypes: {},
  };
  
  const sequelize = {
    define: SequelizeMock.define,
    sync: SequelizeMock.sync,
  };
  
  module.exports = { sequelize, Sequelize: SequelizeMock };
  