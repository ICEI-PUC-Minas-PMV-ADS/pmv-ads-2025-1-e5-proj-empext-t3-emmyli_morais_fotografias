const axios = require('axios');
require('dotenv').config();

const BUNNY_STORAGE_NAME = 'emmyli-moraes-fotografias';

const BUNNY_STORAGE_KEY = process.env.BUNNY_STORAGE_KEY;

const uploadFotoBunnyStorage = async (file) => {
  if (!file || !file.buffer || !file.originalname || !file.mimetype) {
    throw new Error("Arquivo inválido para upload.");
  }

  if (!BUNNY_STORAGE_KEY) {
    throw new Error("Chave Bunny Storage não definida em .env");
  }

  try {
    const fileName = `${Date.now()}_${file.originalname.replace(/\s/g, '_')}`;
    const url = `https://br.storage.bunnycdn.com/${BUNNY_STORAGE_NAME}/${fileName}`; // ✅ CORRIGIDO

    console.log('📤 Enviando para BunnyCDN:', url);
    console.log('🔐 Chave usada:', BUNNY_STORAGE_KEY);

    await axios({
      method: 'PUT',
      url,
      data: file.buffer,
      headers: {
        AccessKey: BUNNY_STORAGE_KEY,
        'Content-Type': 'application/octet-stream',
      },
      maxBodyLength: Infinity,
    });

    const bunnyCDNUrl = `https://galeria-cdn.b-cdn.net/${fileName}`;
    return bunnyCDNUrl;

  } catch (error) {
    console.error('❌ Erro no upload BunnyCDN:', error.response?.data || error.message);
    throw new Error('Falha ao enviar imagem para BunnyCDN.');
  }
};

module.exports = { uploadFotoBunnyStorage };
