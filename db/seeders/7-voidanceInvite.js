const { Sequelize } = require('sequelize');

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const advertisementIds = await queryInterface.sequelize.query(
      `SELECT id FROM "advertisements";`
    );
    const userIds = await queryInterface.sequelize.query(
      `SELECT id FROM "users";`
    );

    const userRows = userIds[0]; 
    const advertisementRows = advertisementIds[0];  

    await queryInterface.bulkInsert('voidance_invites', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        userID: userRows[0].id, 
        advertisementID: advertisementRows[0].id, 
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
        userID: userRows[1].id, 
        advertisementID: advertisementRows[1].id, 
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
        userID: userRows[2].id, 
        advertisementID: advertisementRows[2].id, 
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
    await queryInterface.bulkDelete('voidance_invites', null, {});
  },
};

