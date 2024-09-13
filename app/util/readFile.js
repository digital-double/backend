const fs = require('fs');

exports.readFileToString = (file) => {
  try {
    const fileData = fs.readFileSync(file);
    return fileData.toString();
  } catch (error) {
    return '';
  }
};