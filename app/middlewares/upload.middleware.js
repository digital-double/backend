const multer = require('multer');
const path = require('path');

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,path.join(__dirname, '../../db/uploads')); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});

// Create a multer instance with the storage configuration
const upload = multer({ storage });

module.exports = upload;