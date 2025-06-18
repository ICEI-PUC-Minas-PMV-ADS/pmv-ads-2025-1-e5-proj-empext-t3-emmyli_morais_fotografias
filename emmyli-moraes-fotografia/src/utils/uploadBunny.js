// src/utils/uploadBunny.js
export async function uploadDiretoBunny(file) {
  const bunnyStorageKey = 'b78ff764-b54c-4ad5-8e1ebfd1b255-58b5-4e6a';
  const bunnyStorageZone = 'emmylimoraesfotografias';
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
  return `https://emmylimoraesfotografias.b-cdn.net/${fileName}`;
}
