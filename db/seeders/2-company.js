const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Company', [
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        companyName: 'Techy',
        logo: 'tech_innovations_logo.png',
        description: 'A leading tech company specializing in AI and blockchain solutions.',
        banner: 'tech_innovations_banner.png',
        websiteUrl: 'https://techinnovations.com',
        industry: 'Technology',
        verification: 'verified',
        numOfRunningAds: 10,
        bankName: 'Tech Bank',
        bankAccName: 'Tech Innovations',
        bankAccNo: '1234567890',
        bankRoutingNo: 110001,
        paypalAcc: 'techinnovations@paypal.com',
        bankIban: 'GB29NWBK60161331926819',
        bankPaymentStatus: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        companyName: 'Green Energy Solutions',
        logo: 'green_energy_logo.png',
        description: 'Providing renewable energy solutions globally.',
        banner: 'green_energy_banner.png',
        websiteUrl: 'https://greenenergy.com',
        industry: 'Energy',
        verification: 'pending',
        numOfRunningAds: 5,
        bankName: 'Eco Bank',
        bankAccName: 'Green Energy',
        bankAccNo: '9876543210',
        bankRoutingNo: 220002,
        paypalAcc: 'greenenergy@paypal.com',
        bankIban: 'DE89370400440532013000',
        bankPaymentStatus: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: Sequelize.literal('uuid_generate_v4()'),
        companyName: 'Blue brue company',
        logo: 'Blue.png',
        description: 'We make blue stuff for no reason.',
        banner: 'Blue_stuff_banner.png',
        websiteUrl: 'https://bluestuff.com',
        industry: 'money',
        verification: 'pending',
        numOfRunningAds: 6,
        bankName: 'unEco Bank',
        bankAccName: 'Blue Brue',
        bankAccNo: '98723443210',
        bankRoutingNo: 220003,
        paypalAcc: 'bluebrue@paypal.com',
        bankIban: 'DE65430400440532013000',
        bankPaymentStatus: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Company', null, {});
  }
};
