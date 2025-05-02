const multer = require('multer');

const storage = multer.memoryStorage();

const UploadImage = multer({ storage });

module.exports = UploadImage;
