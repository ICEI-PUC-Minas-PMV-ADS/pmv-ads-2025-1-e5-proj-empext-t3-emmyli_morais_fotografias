const axios = require('axios');
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const BUNNY_STORAGE_NAME = 'emmylifotografias12345';

const BUNNY_STORAGE_KEY = 'f2b85b69-ab88-4015-addc1647f7de-75f5-4984';

// Agente keep-alive evita handshake TLS a cada requisição
const keepAliveAgent = new https.Agent({ keepAlive: true });

const uploadFotoBunnyStorage = async (file) => {
  if (!file || (!file.buffer && !file.path) || !file.originalname || !file.mimetype) {
    throw new Error('Arquivo inválido para upload.');
  }
  if (!BUNNY_STORAGE_NAME || !BUNNY_STORAGE_KEY) {
    throw new Error('Bunny Storage não configurado corretamente em .env');
  }

  try {
    const timestamp = Date.now();
    const safeName  = file.originalname.replace(/\s+/g, '_');
    const fileName  = `${timestamp}_${safeName}`;
    const url       = `https://br.storage.bunnycdn.com/${BUNNY_STORAGE_NAME}/${fileName}`;

    // Prepara corpo e tamanho
    const data = file.buffer || fs.createReadStream(file.path);
    const contentLength = file.buffer
      ? file.buffer.length
      : (await fs.promises.stat(file.path)).size;

    await axios.put(url, data, {
      headers: {
        AccessKey:         BUNNY_STORAGE_KEY,
        'Content-Type':    file.mimetype,
        'Content-Length':  contentLength,
      },
      httpAgent:  keepAliveAgent,
      httpsAgent: keepAliveAgent,
      maxBodyLength: Infinity,
    });

    // Remove arquivo temporário (se existir)
    if (file.path) {
      fs.promises.unlink(file.path)
        .catch(err => console.error('Erro ao remover temp:', err));
    }

    // URL pública via CDN
    return `https://galeria-cdn-2.b-cdn.net/${fileName}`;
  } catch (err) {
    console.error('❌ Erro no upload BunnyCDN:', err.response?.data || err.message);
    throw new Error('Falha ao enviar imagem para BunnyCDN.');
  }
};

/**
 * Deleta um arquivo já enviado no Bunny Storage.
 */
const deleteFotoBunnyStorage = async (fileUrl) => {
  if (!fileUrl) throw new Error('URL inválida para deletar.');
  try {
    const parsed   = new URL(fileUrl);
    const filePath = parsed.pathname.replace('/', ''); // extrai nome do arquivo
    const url      = `https://br.storage.bunnycdn.com/${BUNNY_STORAGE_NAME}/${filePath}`;

    await axios.delete(url, {
      headers:    { AccessKey: BUNNY_STORAGE_KEY },
      httpAgent:  keepAliveAgent,
      httpsAgent: keepAliveAgent,
    });
    console.log(`✅ Foto removida do BunnyCDN: ${filePath}`);
  } catch (err) {
    console.error('❌ Erro ao deletar do BunnyCDN:', err.response?.data || err.message);
    throw new Error('Erro ao excluir imagem do BunnyCDN.');
  }
};

module.exports = {
  uploadFotoBunnyStorage,
  deleteFotoBunnyStorage
};