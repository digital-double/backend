const express = require('express');

function createTestApp(routes) {
  const app = express();
  app.use(express.json());
  app.use(routes); // Pass in specific routes
  return app;
}

module.exports = { createTestApp };
