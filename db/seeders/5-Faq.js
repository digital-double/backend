const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
     // Fetch company IDs from the "Companies" table
     const companyIds = await queryInterface.sequelize.query(
      `SELECT id FROM "companies";`
    );

    // companyIds[0] contains the actual rows of companies
    const companyRows = companyIds[0]; // Extract the data rows

    // Insert data for company admins linked to the fetched company IDs
    await queryInterface.bulkInsert('faqs', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        companyID: companyRows[0].id,
        question: 'What is your return policy?',
        answer: 'We accept returns within 30 days of purchase with a valid receipt.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        companyID: companyRows[0].id,
        question: 'How can I track my order?',
        answer: 'You can track your order through our website using your order ID.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        companyID: companyRows[0].id,
        question: 'Do you offer international shipping?',
        answer: 'Yes, we offer international shipping to select countries.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('faqs', null, {});
  }
};
