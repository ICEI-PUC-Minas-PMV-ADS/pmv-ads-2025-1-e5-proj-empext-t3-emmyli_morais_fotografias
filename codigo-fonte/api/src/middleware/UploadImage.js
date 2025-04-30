const multer = require('multer');

// armazenamento só em memória (não salva no disco)
const storage = multer.memoryStorage();

const ImageUpload = multer({ storage: storage });

module.exports = ImageUpload;
