const { Sequelize } = require('sequelize');

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const companyIds = await queryInterface.sequelize.query(
      `SELECT id FROM "Company";`
    );
    const advertisementIds = await queryInterface.sequelize.query(
      `SELECT id FROM "Advertisement";`
    );
    const userIds = await queryInterface.sequelize.query(
      `SELECT id FROM "Users";`
    );

    const userRows = userIds[0]; 

    const advertisementRows = advertisementIds[0]; 
 
    const companyRows = companyIds[0]; 

    await queryInterface.bulkInsert('VoidanceInvite', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userId: userRows[0].id, 
        companyId: companyRows[0].id, 
        advertisementId: advertisementRows[0].id, 
        subject: 'Invitation to Participate',
        message: 'We invite you to join our campaign.',
        CPC: 2.5,
        campaignName: 'Summer Sale Campaign',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        status: 'pending_user',
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userId: userRows[1].id, 
        companyId: companyRows[1].id, 
        advertisementId: advertisementRows[1].id, 
        subject: 'Special Offer Invitation',
        message: 'Join our campaign for exclusive rewards.',
        CPC: 1.8,
        campaignName: 'Exclusive Rewards Campaign',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        status: 'pending_company',
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userId: userRows[2].id, 
        companyId: companyRows[2].id, 
        advertisementId: advertisementRows[2].id, 
        subject: 'Special Offer Invitation',
        message: 'Join our campaign for exclusive rewards.',
        CPC: 1.8,
        campaignName: 'Exclusive Rewards Campaign',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        status: 'pending_company',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('VoidanceInvite', null, {});
  },
};

