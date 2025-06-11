// src/utils/uploadBunny.js
export async function uploadDiretoBunny(file) {
  const bunnyStorageKey = 'f0632ae4-a76c-4751-9430f6544f87-3811-4d5c';
  const bunnyStorageZone = 'emmylifotografias123456';
  const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
  const url = `https://br.storage.bunnycdn.com/${bunnyStorageZone}/${fileName}`;

  const resp = await fetch(url, {
    method: 'PUT',
    headers: {
      'AccessKey': bunnyStorageKey,
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!resp.ok) {
    const msg = await resp.text();
    throw new Error('Erro no upload BunnyCDN: ' + msg);
  }

  // Retorna a URL pública pelo Pullzone:
  return `https://galeria-cdn-3.b-cdn.net/${fileName}`;
}
