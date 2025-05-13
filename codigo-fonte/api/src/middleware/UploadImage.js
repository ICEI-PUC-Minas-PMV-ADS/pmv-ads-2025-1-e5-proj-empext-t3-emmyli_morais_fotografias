const multer = require('multer');

// Configuração de storage em memória (elimina I/O de disco)
const storage = multer.memoryStorage();

// Define quais tipos de imagem são permitidos
const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp'];

const fileFilter = (req, file, cb) => {
  if (tiposPermitidos.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de imagem não permitido.'), false);
  }
};

module.exports = multer({
  storage,
  fileFilter,
});