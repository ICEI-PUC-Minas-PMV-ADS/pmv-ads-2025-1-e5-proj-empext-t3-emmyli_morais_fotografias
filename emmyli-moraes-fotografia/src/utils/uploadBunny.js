// src/utils/uploadBunny.js
export async function uploadDiretoBunny(file) {
  const bunnyStorageKey = '254aa3c6-e19f-448d-8c8344cca6e6-55d2-40dc';
  const bunnyStorageZone = 'fotografiasemmylimoraes';
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
  return `https://fotografiasemmylimoraes.b-cdn.net/${fileName}`;
}
