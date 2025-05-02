// backend/routes/upload.js
const express = require('express');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');

const router = express.Router();
const storage = new Storage({ keyFilename: 'chave.json' });
const bucket = storage.bucket('NOME_DO_SEU_BUCKET');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('imagem'), async (req, res) => {
  try {
    const blob = bucket.file(Date.now() + req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: req.file.mimetype,
    });

    blobStream.end(req.file.buffer);
    blobStream.on('finish', async () => {
      const publicUrl = `https://cdn.seudominio.com/${blob.name}`; // via BunnyCDN
      res.status(200).json({ url: publicUrl });
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
