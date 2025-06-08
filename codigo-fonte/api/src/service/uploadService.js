const axios = require('axios');
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const BUNNY_STORAGE_NAME = 'emmylifotografias123456';

const BUNNY_STORAGE_KEY = 'f0632ae4-a76c-4751-9430f6544f87-3811-4d5c';

if (!BUNNY_STORAGE_NAME || !BUNNY_STORAGE_KEY) {
  console.error(
    '[uploadService] Aviso: BUNNY_STORAGE_NAME ou BUNNY_STORAGE_KEY não definidos em .env'
  );
}

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
    const urlUpload       = `https://br.storage.bunnycdn.com/${BUNNY_STORAGE_NAME}/${fileName}`;

    
    let dataStream;
    let contentLength;

    if (file.path) {
      // diskStorage: faz leitura em streaming do disco
      dataStream = fs.createReadStream(file.path);
      contentLength = (await fs.promises.stat(file.path)).size;
    } else if (file.buffer) {
      // memoryStorage: usa o buffer inteiro
      dataStream = file.buffer;
      contentLength = file.buffer.length;
    } else {
      // Nenhum dos dois existe: lança erro
      throw new Error('O objeto file não possui file.path nem file.buffer.');
    }

    await axios.put(urlUpload, dataStream, {
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
    return `https://galeria-cdn-3.b-cdn.net/${fileName}`;
  } catch (err) {
    console.error('❌ Erro no upload BunnyCDN:', err.response?.data || err.message);
    throw new Error('Falha ao enviar imagem para BunnyCDN.');
  }
};


const deleteFotoBunnyStorage = async (fileUrl) => {
  if (!fileUrl) throw new Error('URL inválida para deletar.');
  try {
    const parsed   = new URL(fileUrl);
    const filePath = parsed.pathname.replace('/', ''); // extrai nome do arquivo
    const urlDelete      = `https://br.storage.bunnycdn.com/${BUNNY_STORAGE_NAME}/${filePath}`;

    await axios.delete(urlDelete, {
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