const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 1) Define a pasta onde os arquivos serão salvos temporariamente.

const uploadDir = path.resolve(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração de storage em memória (elimina I/O de disco)
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Exemplo de filename: 1686001234567_minha_foto.jpg
    const timestamp = Date.now(); // garante unicidade
    const safeName = file.originalname.replace(/\s+/g, '_'); // substitui espaços por '_'
    cb(null, `${timestamp}_${safeName}`);
  }
});

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